import { Result } from '@common/result';
import { IJob } from '../../../application/model/job.model';

export interface ICreateJobOfferWriter {
  createJob(req: IJob): Promise<Result<boolean>>;
}

export const CREATE_JOB_OFFER_WRITER = 'create-job-offer-writer';
