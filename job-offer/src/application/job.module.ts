import { Module } from '@nestjs/common';
import { JobService } from './job-offer/service/job.service';
import { DatabaseModule } from './job-offer/database/database.module';
import { QueryClientModule } from './job-offer/query-clinet/query-client.module';

@Module({
  imports: [DatabaseModule, QueryClientModule],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
