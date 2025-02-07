import { Module } from '@nestjs/common';
import { IoModule } from './io/io.module';
import { ConfigModule } from '@nestjs/config';
import { pgsqlConfig } from '@infrastructure/database/pgsql/config/pgsql.config';

@Module({
  imports: [
    IoModule,
    ConfigModule.forRoot({
      load: [pgsqlConfig],
    }),
  ],
})
export class AppModule {}
