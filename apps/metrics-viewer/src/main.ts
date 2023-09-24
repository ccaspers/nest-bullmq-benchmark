import { NestFactory } from '@nestjs/core';
import { MetricsViewerModule } from './metrics-viewer.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(MetricsViewerModule);
  await app.listen(3000);
}
bootstrap();
