import { Injectable } from '@nestjs/common';
import amqp from 'amqp-connection-manager';
import { ChatService } from 'src/chat/chat.service';
import { WSGateway } from 'src/gateway/gateway';

@Injectable()
export class ChatConsumerService {
  private readonly url = 'amqp://localhost:5672';
  private readonly CHAT_QUEUE = 'chat_queue';

  constructor(
    private readonly chatService: ChatService,
    private readonly wsGateway: WSGateway,
  ) {}

  async onModuleInit(): Promise<void> {
    const connection = amqp.connect([this.url]);
    const exchange = 'exchange_direct';

    connection.on('connect', () => {
      const channelWrapper = connection.createChannel({
        json: true, // Set this option if you are working with JSON messages
      });

      channelWrapper.on('connect', () => {
        channelWrapper
          .assertExchange(exchange, 'direct', { durable: false })
          .then(async () => {
            const queue = await channelWrapper.assertQueue(this.CHAT_QUEUE);
            const routingKey = 'create-chat-key';
            await channelWrapper.bindQueue(queue.queue, exchange, routingKey);
            channelWrapper.consume(queue.queue, async (msg) => {
              if (msg) {
                console.log(`Received message: ${msg.content}`);
                const data = JSON.parse(msg.content);

                const chat = await this.chatService.processChat(data);
                await this.wsGateway.sendMessageToRecipient(chat);
                channelWrapper.ack(msg);
                return chat;
              }
            });

            return;
          })
          .catch((exchangeError) => {
            console.log('exchangeError', exchangeError);

            connection.close();
          });
      });
    });

    // Consume messages from the queue
  }
}
