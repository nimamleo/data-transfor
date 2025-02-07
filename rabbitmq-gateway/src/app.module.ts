import { Module } from '@nestjs/common';
import { JobModule } from '@job/application/job.module';
import { ConfigModule } from '@nestjs/config';
import { pgsqlConfig } from '@infrastructure/database/pgsql/config/pgsql.config';
import { JobRabbitMqController } from './application/job-rabbitmq.controller';

@Module({
  imports: [
    JobModule,
    ConfigModule.forRoot({
      load: [pgsqlConfig],
    }),
  ],
  providers: [JobRabbitMqController],
})
export class AppModule {}
