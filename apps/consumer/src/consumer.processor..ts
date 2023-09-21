import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MetricsService } from './metrics.service';

@Processor('benchmark')
export class ConsumerProcessor extends WorkerHost {
  constructor(private metricsService: MetricsService) {
    super();
  }

  process(): Promise<void> {
    this.metricsService.measure();
    return Promise.resolve();
  }
}
