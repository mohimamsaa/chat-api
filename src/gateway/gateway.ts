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
  WsException,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WSValidationPipe } from 'src/config/ws.validation';
import { ReceiveMessageDto } from './receive-message.dto';
import { WsFilter } from 'src/config/ws.filter';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';
import { ChatDocument } from 'src/chat/chat.entity';

@UsePipes(new WSValidationPipe())
@UseFilters(new WsFilter())
@WebSocketGateway()
export class WSGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger('WSGateway');
  constructor(
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: ReceiveMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    this.logger.log('Client Send Message', client.id);
    this.logger.log('Client Send Payload', JSON.stringify(data));
    const chat = await this.chatService.processChat(data);

    this.sendMessageToRecipient(chat);
    return 'Hello world!';
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('New Client Connected', client.id);
    this.logger.log('args', JSON.stringify(args));
    const socketId = client.id;
    const userId = client.handshake.headers['x-user-id'];

    if (userId && typeof userId === 'string') {
      try {
        await this.userService.updateSocketIdUser(userId, socketId);
        return 'Success Connect';
      } catch (err) {
        throw new WsException(err.message);
      }
    }
  }

  async handleDisconnect(client: any) {
    this.logger.log('Client DisConnected', client.id);
    const userId = client.handshake.headers['x-user-id'];

    if (userId && typeof userId === 'string') {
      try {
        await this.userService.updateSocketIdUser(userId, '');
        return 'Success Disconnect';
      } catch (err) {
        throw new WsException(err.message);
      }
    }
  }

  async sendMessageToRecipient(chat: ChatDocument) {
    const user = await this.userService.getUserById(chat.recipientId);

    if (user.socketId) {
      this.server.to(user.socketId).emit('message', chat);
    }
  }
}
