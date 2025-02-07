import { Inject, Injectable } from '@nestjs/common';
import {
  IJobDatabaseProvider,
  JOB_DATABASE_PROVIDER,
} from '../database/provider/job-database.provider';
import { IJob, IJobEntity } from '../model/job.model';
import {
  IJobQueryClientProvider,
  JOB_QUERY_CLIENT,
} from '../query-clinet/provider/job-query-client.provider';
import { GenericStatusCodes } from '@common/enums/status.enum';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { Err, Ok, Result } from '@common/result';
import { ILimitation } from '@common/pagination/limitation.interface';
import { IPaginatedResult } from '@common/pagination/paginated-result.interface';
import { PaginationResult } from '@common/pagination/paginatio-result';
import { JobListResponseItem2 } from '../query-clinet/http/model/get-job-list-2.model';

@Injectable()
export class JobService {
  constructor(
    @Inject(JOB_DATABASE_PROVIDER)
    private readonly jobDatabaseProvider: IJobDatabaseProvider,
    @Inject(JOB_QUERY_CLIENT)
    private readonly queryClientProvider: IJobQueryClientProvider,
  ) {}

  @HandleError
  async fetchJobOfferList1(): Promise<Result<IJob[]>> {
    const fetchedData = await this.queryClientProvider.getJobListProvider1();
    if (fetchedData.isError()) {
      return Err(fetchedData.err);
    }

    const iJobEntities: IJob[] = fetchedData.value.jobs.map((x) => ({
      customId: x.jobId.split('-')[1],
      title: x.title,
      company: {
        city: x.details.location.split(',')[0],
        state: x.details.location.split(',')[1],
        name: x.company.name,
        industry: x.company.industry,
      },
      minSalary:
        Number(x.details.salaryRange.split('-')[0].replace(/\$|k/g, '')) * 1000,
      maxSalary:
        Number(x.details.salaryRange.split('-')[1].replace(/\$|k/g, '')) * 1000,
      currency: 'USD',
      position: x.details.type,
      requirements: x.skills,
      postedDate: new Date(x.postedDate),
    }));

    return Ok(iJobEntities);
  }

  @HandleError
  async fetchJobOfferList2(): Promise<Result<IJob[]>> {
    const fetchedData = await this.queryClientProvider.getJobListProvider2();
    if (fetchedData.isError()) {
      return Err(fetchedData.err);
    }

    const jobListKeys = Object.keys(fetchedData.value.data.jobsList);

    const iJobEntities: IJob[] = jobListKeys.map((key) => {
      const value: JobListResponseItem2 = fetchedData.value.data.jobsList[key];
      const id = key.split('-')[1];
      return {
        customId: id,
        title: value.position,
        minSalary: value.compensation.min,
        maxSalary: value.compensation.max,
        currency: value.compensation.currency,
        company: {
          name: value.employer.companyName,
          city: value.location.city,
          state: value.location.state,
          website: value.employer.website,
        },
        experience: value.requirements.experience,
        requirements: value.requirements.technologies,
        position: value.location.remote ? 'remote' : 'part-time',
        postedDate: new Date(value.datePosted),
      };
    });

    return Ok(iJobEntities);
  }

  @HandleError
  async createJob(iJob: IJob): Promise<Result<IJobEntity>> {
    const geJob = await this.jobDatabaseProvider.getJobByCustomId(
      iJob.customId,
    );
    if (geJob.isError()) {
      if (geJob.err._code == GenericStatusCodes.NOT_FOUND) {
        const createJob = await this.jobDatabaseProvider.createJob(iJob);
        if (createJob.isError()) {
          return Err(createJob.err);
        }
        return Ok(createJob.value);
      }
      return Err(geJob.err);
    }
    return Ok(geJob.value);
  }

  @HandleError
  async getJobList(
    title: string,
    min: number,
    max: number,
    city: string,
    limitation: ILimitation,
  ): Promise<Result<IPaginatedResult<IJobEntity>>> {
    const res = await this.jobDatabaseProvider.getJobList({
      title: title,
      minSalary: min,
      maxSalary: max,
      city: city,
      limitation: limitation,
    });
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(new PaginationResult(res.value[0], res.value[1], limitation));
  }
}
