import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IPgsqlConfig, PGSQL_CONFIG_TOKEN } from './pgsql/config/pgsql.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pgsqlConfig: IPgsqlConfig = configService.get(PGSQL_CONFIG_TOKEN);
        return {
          type: 'postgres',
          username: pgsqlConfig.username,
          port: pgsqlConfig.port,
          host: pgsqlConfig.host,
          password: pgsqlConfig.password,
          database: pgsqlConfig.dbName,
          logging: true,
          synchronize: false,
          entities: ['**/dist/**/pgsql/**/*.entity{.ts,.js}'],
          migrations: ['**/dist/**/pgsql/**/**.migration{.ts,.js}'],
          migrationsRun: true,
        };
      },
    }),
  ],
})
export class CoreDatabaseModule {}
