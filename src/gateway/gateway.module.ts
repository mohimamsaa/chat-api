import { Module } from '@nestjs/common';
import { WSGateway } from './gateway';

@Module({
  providers: [WSGateway],
})
export class GatewayModule {}
