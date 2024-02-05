import { Module } from '@nestjs/common';
import { WSGateway } from './gateway';
import { ChatModule } from 'src/chat/chat.module';
import { UserModule } from 'src/user/user.module';
import { ProducerModule } from 'src/producer/producer.module';

@Module({
  providers: [WSGateway],
  imports: [ChatModule, UserModule, ProducerModule],
  exports: [WSGateway],
})
export class GatewayModule {}
