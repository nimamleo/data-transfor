import { Module } from '@nestjs/common';
import { JobModule } from '../../../job-offer/src/application/job.module';
import { JobHttpController } from './http/controller/job-http.controller';

@Module({
  imports: [JobModule],
  controllers: [JobHttpController],
})
export class IoModule {}
