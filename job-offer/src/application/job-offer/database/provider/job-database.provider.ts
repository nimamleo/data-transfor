import { IJob, IJobEntity } from '../../model/job.model';
import { ICompany, ICompanyEntity } from '../../model/company.model';
import { GetJobListQueryable } from '../pgsql/service/queryable/get-job-list.queryable';
import { Result } from '@common/result';

export interface IJobDatabaseReader {
  getJobList(
    queryable: GetJobListQueryable,
  ): Promise<Result<[IJobEntity[], number]>>;

  getJobByCustomId(id: string): Promise<Result<IJobEntity>>;
}
export interface IJobDatabaseWriter {
  createJob(iJob: IJob): Promise<Result<IJobEntity>>;

  createCompany(iCompany: ICompany): Promise<Result<ICompanyEntity>>;
}
export interface IJobDatabaseProvider
  extends IJobDatabaseReader,
    IJobDatabaseWriter {}

export const JOB_DATABASE_PROVIDER = 'job-database-provider';
