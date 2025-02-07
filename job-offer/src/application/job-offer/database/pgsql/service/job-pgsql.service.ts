import { Injectable, Logger } from '@nestjs/common';
import { IJobDatabaseProvider } from '../../provider/job-database.provider';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { Err, Ok, Result } from '@common/result';
import { JobEntity } from '../entity/job.entity';
import { CompanyEntity } from '../entity/company.entity';
import { IJob, IJobEntity } from '../../../model/job.model';
import { ICompany, ICompanyEntity } from '../../../model/company.model';
import { GetJobListQueryable } from './queryable/get-job-list.queryable';
import { GenericStatusCodes } from '@common/enums/status.enum';

@Injectable()
export class JobPgsqlService implements IJobDatabaseProvider {
  private readonly logger = new Logger(JobPgsqlService.name);
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {}

  @HandleError
  async createJob(iJob: IJob): Promise<Result<IJobEntity>> {
    let iJoBEntity: IJobEntity;

    await this.datasource.transaction(async (entityManager: EntityManager) => {
      const newCompany = CompanyEntity.fromICompany(iJob.company as ICompany);
      const getCompany = await entityManager
        .getRepository(CompanyEntity)
        .createQueryBuilder('c')
        .where('c.name = :name', { name: newCompany.name })
        .getOne();

      if (!getCompany) {
        const company = await entityManager
          .getRepository(CompanyEntity)
          .save(newCompany);
        iJob.company = CompanyEntity.toICompanyEntity(company);
      } else {
        iJob.company = CompanyEntity.toICompanyEntity(getCompany);
      }

      const newJob = JobEntity.fromIJob(iJob);
      const job = await entityManager.getRepository(JobEntity).save(newJob);

      iJoBEntity = JobEntity.toIJobEntity(job);
    });
    return Ok(iJoBEntity);
  }

  @HandleError
  async createCompany(iCompany: ICompany): Promise<Result<ICompanyEntity>> {
    const newData = CompanyEntity.fromICompany(iCompany);
    const res = await this.companyRepository.save(newData);
    if (!res) {
      this.logger.error('create company failed');
      return Err('something went wrong');
    }

    return Ok(CompanyEntity.toICompanyEntity(res));
  }

  @HandleError
  async getJobList(
    queryable: GetJobListQueryable,
  ): Promise<Result<[IJobEntity[], number]>> {
    const query = this.jobRepository
      .createQueryBuilder('j')
      .leftJoinAndSelect('j.company', 'c');

    if (queryable.title) {
      query.andWhere('j.title ILIKE :title', { title: `%${queryable.title}%` });
    }

    if (queryable.city) {
      query.andWhere('c.city ilike :city', { city: `%${queryable.city}%` });
    }

    if (queryable.minSalary) {
      query.andWhere('j.minSalary >= :min', { min: queryable.minSalary });
    }

    if (queryable.maxSalary) {
      query.andWhere('j.maxSalary <= :max', { max: queryable.maxSalary });
    }

    const [res, count] = await query
      .offset(queryable.limitation.skip)
      .limit(queryable.limitation.limit)
      .getManyAndCount();

    return Ok([res.map((x) => JobEntity.toIJobEntity(x)), count]);
  }

  @HandleError
  async getJobByCustomId(id: string): Promise<Result<IJobEntity>> {
    const res = await this.jobRepository
      .createQueryBuilder('j')
      .where('j.customId = :id', { id: id })
      .getOne();
    if (!res) {
      return Err('job not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(JobEntity.toIJobEntity(res));
  }
}
