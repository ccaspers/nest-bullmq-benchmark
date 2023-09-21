import { InjectQueue } from '@nestjs/bullmq';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import { MetricsService } from './metrics.service';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  private running = false;
  private promise: Promise<void> | undefined;
  private logger = new Logger(ProducerService.name);

  constructor(
    @InjectQueue('benchmark') private queue: Queue,
    private metricsService: MetricsService,
  ) {}

  onModuleInit() {
    this.logger.log('init');
    this.promise = this.run();
    return Promise.resolve();
  }

  async onModuleDestroy() {
    this.logger.log('destroy');
    this.running = false;
    await this.promise;
  }

  private async run() {
    this.running = true;
    while (this.running) {
      this.metricsService.measure();
      await this.queue.add('job', { date: new Date() });
    }
  }
}
