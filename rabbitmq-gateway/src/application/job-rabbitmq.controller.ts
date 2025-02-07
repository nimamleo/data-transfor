import { Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { AbstractRabbitMQController } from '@common/rabbitmq/abstract-rabbitmq.controller';
import { Stream } from '@common/rabbitmq/stream.interface';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { JobOfferCreate } from '@common/streams/rabbitmq/job-offer.model';
import { JobService } from '@job/application/job-offer/service/job.service';

@Injectable()
export class JobRabbitMqController extends AbstractRabbitMQController {
  private channelWrapper: ChannelWrapper;

  constructor(private readonly jobOfferService: JobService) {
    super();
    this.channelWrapper = amqp.connect(['amqp://localhost']).createChannel();
  }

  client(): ChannelWrapper {
    return this.channelWrapper;
  }

  Logger(): Logger {
    return new Logger();
  }

  streams(): Stream[] {
    return [
      {
        name: new JobOfferCreate().streamKey(),
        payload: (data) => this.createJobOffer(data),
      },
    ];
  }

  @HandleError
  async createJobOffer(req: JobOfferCreate) {
    const res = await this.jobOfferService.createJob({
      customId: req.customId,
      title: req.title,
      minSalary: req.minSalary,
      maxSalary: req.maxSalary,
      currency: req.currency,
      experience: req.experience,
      position: req.position,
      postedDate: req.postedDate,
      company: {
        name: req.company.name,
        industry: req.company.industry,
        city: req.company.city,
        state: req.company.state,
      },
      requirements: req.requirements,
    });
    if (res.isError()) {
    }
  }
}
