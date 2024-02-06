import { Injectable, Logger } from '@nestjs/common';
import amqp from 'amqp-connection-manager';

@Injectable()
export class MessageProducerService {
  private readonly url = process.env.RABBITMQ_AMQP_URL;
  private readonly logger = new Logger(MessageProducerService.name);

  constructor() {}

  async publishMessage<T>(exchange: string, routingKey: string, message: T) {
    const connection = amqp.connect([this.url]);

    connection.on('connect', () => {
      const channelWrapper = connection.createChannel({
        json: true, // Set this option if you are working with JSON messages
      });

      channelWrapper.on('connect', () => {
        channelWrapper
          .assertExchange(exchange, 'direct', { durable: false })
          .then(() => {
            // Publish the message with a callback
            channelWrapper.publish(
              exchange,
              routingKey,
              message,
              {},
              (publishError) => {
                if (publishError) {
                  this.logger.error('publishError', publishError);
                } else {
                  this.logger.log(`Sent message: ${JSON.stringify(message)}`);
                }

                // Close channel
                channelWrapper.close();

                // Close connection
                connection.close();
              },
            );
          })
          .catch((exchangeError) => {
            this.logger.error('exchangeError', exchangeError);
            // Close connection
            connection.close();
          });
      });
    });
  }
}
