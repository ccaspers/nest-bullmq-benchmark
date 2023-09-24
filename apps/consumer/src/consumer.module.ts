import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConsumerProcessor } from './consumer.processor.';
import { MetricsService } from './metrics.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'benchmark',
    }),
  ],
  providers: [MetricsService, ConsumerProcessor],
})
export class ConsumerModule {}
