import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';

export type Measurement = { date: number; value: number };
const METRICS_HOST = process.env.METRICS_HOST || 'localhost:3000';

@Injectable()
export class MetricsService {
  private counter = 0;

  constructor(private httpService: HttpService) {}

  public measure() {
    this.counter += 1;
  }

  @Interval(1000)
  public async collect() {
    const measurement: Measurement = {
      date: new Date().getTime(),
      value: this.counter,
    };
    this.counter = 0;
    console.log(
      'measuring',
      `http://${METRICS_HOST}}/api/measure/producer`,
      measurement,
    );
    await firstValueFrom(
      this.httpService.post(
        `http://${METRICS_HOST}/api/measure/producer`,
        measurement,
      ),
    );
  }
}
