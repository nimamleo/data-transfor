import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { JobOfferCreate } from '@common/streams/rabbitmq/job-offer.model';
import { JobRabbitMqController } from './application/job-rabbitmq.controller';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule);

  const rabbit = await app.resolve<JobRabbitMqController>(
    JobRabbitMqController,
  );
  await rabbit.consumeQueue(new JobOfferCreate({}).streamKey());

  await app.listen();
}

bootstrap();
