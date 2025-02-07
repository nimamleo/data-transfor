import { Module } from '@nestjs/common';
import { JOB_QUERY_CLIENT } from './provider/job-query-client.provider';
import { ExternalHttpService } from './http/external-http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: JOB_QUERY_CLIENT,
      useClass: ExternalHttpService,
    },
  ],
  exports: [JOB_QUERY_CLIENT],
})
export class QueryClientModule {}
