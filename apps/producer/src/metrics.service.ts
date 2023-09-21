import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { sum } from 'lodash';

@Injectable()
export class MetricsService {
  private counter = 0;

  private observations = {
    seconds: new Array<number>(),
    minutes: new Array<number>(),
    hours: new Array<number>(),
  };

  public measure() {
    this.counter += 1;
  }

  @Interval(1000)
  public collect() {
    if (this.observations.minutes.length === 60) {
      this.observations.hours.push(sum(this.observations.minutes));
      this.observations.minutes.length = 0;
    }

    if (this.observations.seconds.length === 60) {
      this.observations.minutes.push(sum(this.observations.seconds));
      this.observations.seconds.length = 0;
    }

    this.observations.seconds.push(this.counter);
    this.counter = 0;
  }

  public getMetrics() {
    return this.observations;
  }
}
