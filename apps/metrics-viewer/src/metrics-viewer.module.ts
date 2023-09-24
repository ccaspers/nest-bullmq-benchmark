import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MetricsController } from './metrics.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [MetricsController],
})
export class MetricsViewerModule {}
