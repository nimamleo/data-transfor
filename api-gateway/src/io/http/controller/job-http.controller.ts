import {
  Controller,
  Get,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetJobListRequestA,
  GetJobListResponseA,
} from './models/get-job-list-A.model';
import {
  GetJobListRequestB,
  GetJobListResponseB,
} from './models/get-job-list-B.model';
import { AbstractHttpController } from '@common/http/abstract-http.controller';
import { JobService } from '@job/application/job-offer/service/job.service';
import { Ok } from '@common/result';
import { Pagination } from '@common/pagination/pagination.model';
import { IPaginatedResult } from '@common/pagination/paginated-result.interface';

@Controller('job-offers')
@ApiTags('JOB')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class JobHttpController extends AbstractHttpController {
  constructor(private readonly jobService: JobService) {
    super();
  }

  @Get('A')
  @ApiResponse({ type: GetJobListResponseA })
  async getJobListA(
    @Res() response: Response,
    @Query() query: GetJobListRequestA,
  ) {
    const pagination = new Pagination(query.page);
    const res = await this.jobService.getJobList(
      query.title,
      query.min ? +query.min : null,
      query.max ? +query.max : null,
      query.city,
      { skip: pagination.getSkip(), limit: pagination.getLimit() },
    );
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<IPaginatedResult<GetJobListResponseA>>({
        page: res.value.page,
        pageSize: res.value.pageSize,
        total: res.value.total,
        list: res.value.list.map((x) => ({
          id: `job-${x.id}`,
          position: x.title,
          location: {
            city: x.company.city,
            remote: x.position == 'remote',
            state: x.company.state,
          },
          compensation: {
            min: x.minSalary,
            max: x.maxSalary,
            currency: x.currency,
          },
          employer: {
            companyName: x.company.name,
            website: x.company.website,
          },
          requirements: {
            experience: x.experience,
            technologies: x.requirements,
          },
          postedDate: x.postedDate.toISOString().split('T')[0],
        })),
      }),
    );
  }

  @Get('B')
  @ApiResponse({ type: GetJobListResponseB })
  async getJobListB(
    @Res() response: Response,
    @Query() query: GetJobListRequestB,
  ) {
    const pagination = new Pagination(query.page);
    const res = await this.jobService.getJobList(
      query.title,
      query.min ? +query.min : null,
      query.max ? +query.max : null,
      query.city,
      { skip: pagination.getSkip(), limit: pagination.getLimit() },
    );
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<IPaginatedResult<GetJobListResponseB>>({
        page: res.value.page,
        pageSize: res.value.pageSize,
        total: res.value.total,
        list: res.value.list.map((x) => ({
          jobId: `P1-${x.id}`,
          title: x.title,
          detail: {
            location: `${x.company.city} ${x.company.state}`,
            type: x.position,
            salaryRange: `${x.minSalary / 1000}k - ${x.minSalary / 100}k`,
          },
          company: {
            name: x.company.name,
            industry: x.company.industry,
          },
          skills: x.requirements,
          postedDate: x.postedDate.toISOString(),
        })),
      }),
    );
  }
}
