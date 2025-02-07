import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JobEntity } from './pgsql/entity/job.entity';
import { CompanyEntity } from './pgsql/entity/company.entity';
import { JOB_DATABASE_PROVIDER } from './provider/job-database.provider';
import { JobPgsqlService } from './pgsql/service/job-pgsql.service';
import { CoreDatabaseModule } from '@infrastructure/database/core-database.module';

@Module({
  imports: [
    ConfigModule,
    CoreDatabaseModule,
    TypeOrmModule.forFeature([JobEntity, CompanyEntity]),
  ],
  providers: [
    {
      provide: JOB_DATABASE_PROVIDER,
      useClass: JobPgsqlService,
    },
  ],
  exports: [JOB_DATABASE_PROVIDER],
})
export class DatabaseModule {}
