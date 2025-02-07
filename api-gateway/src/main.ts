import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HTTP_CONFIG_TOKEN,
  httpConfig,
  IHttpConfig,
} from './io/http/config/http.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function loadConfig(): Promise<ConfigService> {
  const app = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      load: [httpConfig],
    }),
  );

  return app.get<ConfigService>(ConfigService);
}

async function bootstrap() {
  const configService = await loadConfig();
  const httpConfig: IHttpConfig = await configService.get(HTTP_CONFIG_TOKEN);
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SHOP API Gateway')
    .setDescription('SHOP API Gateway')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', in: 'header' })
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('swagger', app, swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.enableCors();
  await app.listen(httpConfig.port);
  logger.debug(`app is running on port ${httpConfig.port}`);
}
bootstrap();
