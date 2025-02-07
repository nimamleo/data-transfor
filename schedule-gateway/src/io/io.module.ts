import { Module } from '@nestjs/common';
import { JobCronJobsService } from './cron-jobs/job-cron-jobs.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CommandClientModule } from '../infrastructure/comand-client/command-client.module';
import { JobModule } from '@job/application/job.module';

@Module({
  imports: [ScheduleModule.forRoot(), CommandClientModule, JobModule],
  providers: [JobCronJobsService],
  exports: [JobCronJobsService],
})
export class IoModule {}
