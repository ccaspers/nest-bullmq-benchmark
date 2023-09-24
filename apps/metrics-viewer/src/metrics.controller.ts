import {
  Body,
  Controller,
  Get,
  Logger,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Observable, Subject, map } from 'rxjs';

export class Measurement {
  date!: number;
  value!: number;
}

@Controller('/api')
export class MetricsController {
  private logger = new Logger(MetricsController.name);
  private emitters: {
    producer: Subject<Measurement>;
    consumer: Subject<Measurement>;
  } = {
    producer: new Subject(),
    consumer: new Subject(),
  };
  private tests = [];

  @Get()
  public hello() {
    return 'hello';
  }

  @Post('/measure/:collection')
  public measure(
    @Param('collection') collection: 'producer' | 'consumer',
    @Body() measurement: Measurement,
  ) {
    this.emitters[collection].next(measurement);
  }

  @Interval(1000)
  addTest() {
    this.tests.push(1);
  }

  @Sse('/stream/:collection')
  stream(
    @Param('collection') collection: 'producer' | 'consumer',
  ): Observable<MessageEvent> {
    return this.emitters[collection].asObservable().pipe(
      map((data) => {
        console.log({ collection, data });
        return { data };
      }),
    );
  }
}
