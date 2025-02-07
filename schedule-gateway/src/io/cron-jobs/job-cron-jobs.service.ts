import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobService } from '@job/application/job-offer/service/job.service';
import {
  CREATE_JOB_OFFER_WRITER,
  ICreateJobOfferWriter,
} from '../../infrastructure/comand-client/provider/create-job-offer.provider';

@Injectable()
export class JobCronJobsService {
  private readonly logger = new Logger(JobCronJobsService.name);
  constructor(
    @Inject(CREATE_JOB_OFFER_WRITER)
    private readonly createJobOfferWriter: ICreateJobOfferWriter,
    private readonly jobOfferService: JobService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async fetchJobOfferList1() {
    const fetchedJobOffers = await this.jobOfferService.fetchJobOfferList1();
    if (fetchedJobOffers.isError()) {
      this.logger.error('get summary failed');
      return;
    }

    for (const fetchedJobOffer of fetchedJobOffers.value) {
      await this.createJobOfferWriter.createJob(fetchedJobOffer);
    }
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async fetchJobOfferList2() {
    const fetchedJobOffers = await this.jobOfferService.fetchJobOfferList2();
    if (fetchedJobOffers.isError()) {
      this.logger.error('get summary failed');
      return;
    }

    for (const fetchedJobOffer of fetchedJobOffers.value) {
      await this.createJobOfferWriter.createJob(fetchedJobOffer);
    }
  }
}
