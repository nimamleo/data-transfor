import { GetJobListResponse1 } from '../http/model/get-job-list-1.model';
import { Result } from '@common/result';
import { GetJobListResponse2 } from '../http/model/get-job-list-2.model';

export interface IJobQueryClientProvider {
  getJobListProvider1(): Promise<Result<GetJobListResponse1>>;

  getJobListProvider2(): Promise<Result<GetJobListResponse2>>;
}

export const JOB_QUERY_CLIENT = 'job-query-client';
