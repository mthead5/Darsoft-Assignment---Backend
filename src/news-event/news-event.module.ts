import { Module } from '@nestjs/common';
import { NewsEventGateway } from './news-event.gateway';

@Module({
  providers: [NewsEventGateway],
  exports: [NewsEventGateway],
})
export class NewsEventModule {}
