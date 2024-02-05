import { Module } from '@nestjs/common';
import { MessageProducerService } from './producer.service';

@Module({
  imports: [],
  exports: [MessageProducerService],
  providers: [MessageProducerService],
})
// export class RabbitMQModule {}
export class ProducerModule {
  constructor() {
    console.log('RabbitMQModule initialized');
  }
}
