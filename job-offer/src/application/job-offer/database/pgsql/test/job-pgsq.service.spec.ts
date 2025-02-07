import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../entity/job.entity';
import { CompanyEntity } from '../entity/company.entity';
import { Repository } from 'typeorm';
import { JobPgsqlService } from '../service/job-pgsql.service';
import { jobStub } from './stubs/job.stubs';
import { companyStub } from './stubs/company.stubs';
import { Job1738942023919 } from '@infrastructure/database/pgsql/migrations/1738942023919-job.migration';
import { JOB_DATABASE_PROVIDER } from '../../provider/job-database.provider';

describe('JobPgsqlService Integration Tests', () => {
  let module: TestingModule;
  let jobPgsqlService: JobPgsqlService;
  let jobRepo: Repository<JobEntity>;
  let companyRepo: Repository<CompanyEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'nimamleo',
          password: 'root',
          database: 'test',
          entities: [JobEntity, CompanyEntity],
          synchronize: false,
          migrationsRun: true,
          dropSchema: true,
          migrations: [Job1738942023919],
        }),
        TypeOrmModule.forFeature([JobEntity, CompanyEntity]),
      ],
      providers: [
        {
          provide: JOB_DATABASE_PROVIDER,
          useClass: JobPgsqlService,
        },
      ],
    }).compile();

    jobPgsqlService = module.get<JobPgsqlService>(JOB_DATABASE_PROVIDER);
    jobRepo = module.get(getRepositoryToken(JobEntity));
    companyRepo = module.get(getRepositoryToken(CompanyEntity));
  });

  afterAll(async () => {
    await module.close();
  });

  describe('createJob', () => {
    it('should create a new job with a new company', async () => {
      const jobData = jobStub();
      const result = await jobPgsqlService.createJob(jobData);

      expect(result.isOK()).toBe(true);
      if (result.isOK()) {
        const job = result.value;
        expect(job.title).toBe(jobData.title);
        expect(job.requirements).toEqual(jobData.requirements);
        expect(job.currency).toBe(jobData.currency);
      }
    });

    it('should create a job with existing company', async () => {
      const companyData = companyStub();
      await jobPgsqlService.createCompany(companyData);

      const jobData = {
        ...jobStub(),
        company: companyData,
      };

      const result = await jobPgsqlService.createJob(jobData);
      expect(result.isOK()).toBe(true);
    });
  });
});
