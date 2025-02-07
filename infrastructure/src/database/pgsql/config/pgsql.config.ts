import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IPgsqlConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  dbName: string;
}

export const PGSQL_CONFIG_TOKEN = 'pgsql-config-token';

export const pgsqlConfig = registerAs<
  IPgsqlConfig,
  ConfigFactory<IPgsqlConfig>
>(PGSQL_CONFIG_TOKEN, () => {
  const errors = [];

  if (!process.env.PGSQL_HOST) {
    errors.push('PGSQL_HOST not provided');
  }
  if (!process.env.PGSQL_PORT) {
    errors.push('PGSQL_PORT not provided');
  }
  if (!process.env.PGSQL_PASSWORD) {
    errors.push('PGSQL_PASSWORD not provided');
  }
  if (!process.env.PGSQL_USERNAME) {
    errors.push('PGSQL_USERNAME not provided');
  }
  if (!process.env.PGSQL_DB_NAME) {
    errors.push('PGSQL_DB_NAME not provided');
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return {
    host: process.env.PGSQL_HOST,
    port: +process.env.PGSQL_PORT,
    username: process.env.PGSQL_USERNAME,
    password: process.env.PGSQL_PASSWORD,
    dbName: process.env.PGSQL_DB_NAME,
  };
});
