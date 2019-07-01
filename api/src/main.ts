import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { httpLogger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = app.get('ConfigService').get('server.port');

  /* Enable validation globally. Strictly forbids extraneous fields */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /* Middleware */
  app.use(httpLogger);
  app.use(helmet());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
    }),
  );

  /* Set up Swagger API docs @ /api/docs */
  const options = new DocumentBuilder()
    .setTitle('Warmr API')
    .setDescription('A location based productivity API')
    .setVersion('1.0')
    // .setBasePath('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  /* Start server */
  await app.listen(port);
  logger.log(`Server started and listening @ port: ${port}`);
}
bootstrap();
