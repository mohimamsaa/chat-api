import { Module } from '@nestjs/common';
import { WSGateway } from './gateway';
import { ChatModule } from 'src/chat/chat.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [WSGateway],
  imports: [ChatModule, UserModule],
})
export class GatewayModule {}
