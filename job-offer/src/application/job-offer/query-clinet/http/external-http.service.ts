import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GetJobListResponse1 } from './model/get-job-list-1.model';
import { IJobQueryClientProvider } from '../provider/job-query-client.provider';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { GetJobListResponse2 } from './model/get-job-list-2.model';

@Injectable()
export class ExternalHttpService implements IJobQueryClientProvider {
  constructor(private readonly httpService: HttpService) {}

  @HandleError
  async getJobListProvider1(): Promise<Result<GetJobListResponse1>> {
    const res = await lastValueFrom(
      this.httpService.get<GetJobListResponse1>(
        'https://assignment.devotel.io/api/provider1/jobs',
      ),
    );
    if (res.status !== 200) {
      return Err('something went wrong');
    }

    return Ok(res.data);
  }

  @HandleError
  async getJobListProvider2(): Promise<Result<GetJobListResponse2>> {
    const res = await lastValueFrom(
      this.httpService.get<GetJobListResponse2>(
        'https://assignment.devotel.io/api/provider2/jobs',
      ),
    );
    if (res.status !== 200) {
      return Err('something went wrong');
    }

    return Ok(res.data);
  }
}
