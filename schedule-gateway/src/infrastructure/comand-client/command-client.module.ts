import { Module } from '@nestjs/common';
import { JobRabbitMqService } from './rabbitMQ/job-rabbitMq.service';
import { CREATE_JOB_OFFER_WRITER } from './provider/create-job-offer.provider';

@Module({
  providers: [
    {
      provide: CREATE_JOB_OFFER_WRITER,
      useClass: JobRabbitMqService,
    },
  ],
  exports: [CREATE_JOB_OFFER_WRITER],
})
export class CommandClientModule {}
