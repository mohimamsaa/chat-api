import { Module } from '@nestjs/common';
import { ChatConsumerService } from './consumer.service';
import { ChatModule } from 'src/chat/chat.module';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  providers: [ChatConsumerService],
  imports: [ChatModule, GatewayModule],
  exports: [ChatConsumerService],
})
export class ConsumerModule {}
