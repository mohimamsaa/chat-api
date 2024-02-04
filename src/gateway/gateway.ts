import { Logger, UseFilters, UsePipes } from '@nestjs/common';

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WSValidationPipe } from 'src/config/ws.validation';
import { ReceiveMessageDto } from './receive-message.dto';
import { WsFilter } from 'src/config/ws.filter';

@UsePipes(new WSValidationPipe())
@UseFilters(new WsFilter())
@WebSocketGateway()
export class WSGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger('WSGateway');

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: ReceiveMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    console.log(data.recipientId);
    console.log('Client Send Message', client.id);
    console.log('Client Send Payload', data);
    return 'Hello world!';
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;
    console.log('New Client Connected', client.id);
    console.log('Argument', args);
    console.log(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    console.log('Client DisConnected', client.id);
  }
}
