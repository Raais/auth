import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NotFoundExceptionFilter } from './filters/notfound-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.use(cookieParser(process.env.JWT_SECRET));
  await app.listen(3000);
}
bootstrap();
