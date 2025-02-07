import { Injectable } from '@nestjs/common';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { AbstractRabbitMQController } from '@common/rabbitmq/abstract-rabbitmq.controller';
import { Stream } from '@common/rabbitmq/stream.interface';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Logger } from '@nestjs/common';
import { ICreateJobOfferWriter } from '../provider/create-job-offer.provider';
import { IJob, IJobEntity } from '../../../application/model/job.model';
import { JobOfferCreate } from '@common/streams/rabbitmq/job-offer.model';

@Injectable()
export class JobRabbitMqService
  extends AbstractRabbitMQController
  implements ICreateJobOfferWriter
{
  private readonly logger: Logger = new Logger(JobRabbitMqService.name);
  private channelWrapper: ChannelWrapper;
  constructor() {
    super();
    this.channelWrapper = amqp.connect(['amqp://localhost']).createChannel();
  }
  streams(): Stream[] {
    return [];
  }

  Logger(): Logger {
    return this.logger;
  }

  client(): ChannelWrapper {
    return this.channelWrapper;
  }

  @HandleError
  async createJob(req: IJob): Promise<Result<boolean>> {
    const data = new JobOfferCreate({
      customId: req.customId,
      maxSalary: req.maxSalary,
      minSalary: req.minSalary,
      company: {
        name: req.company.name,
        website: req.company.website,
        city: req.company.city,
        industry: req.company.city,
        state: req.company.state,
      },
      currency: req.currency,
      position: req.position,
      title: req.title,
      experience: req.experience,
      requirements: req.requirements,
      postedDate: req.postedDate,
    });
    const res = await this.addToQueue(data.streamKey(), {
      name: data.streamKey(),
      value: data,
    });
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(true);
  }
}
