import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConsumerController } from './consumer.controller';
import { ConsumerProcessor } from './consumer.processor.';
import { MetricsService } from './metrics.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'benchmark',
    }),
  ],
  controllers: [ConsumerController],
  providers: [MetricsService, ConsumerProcessor],
})
export class ConsumerModule {}
