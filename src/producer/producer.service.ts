import { Injectable } from '@nestjs/common';
import amqp from 'amqp-connection-manager';

@Injectable()
export class MessageProducerService {
  constructor() {}
  private readonly url = 'amqp://localhost:5672';

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
                  console.log(publishError);
                } else {
                  console.log(`Sent message: ${JSON.stringify(message)}`);
                }

                // Close channel
                channelWrapper.close();

                // Close connection
                connection.close();
              },
            );
          })
          .catch((exchangeError) => {
            console.log('exchangeError', exchangeError);
            // Close connection
            connection.close();
          });
      });
    });
    // const channel = connection.createChannel();
    // try {
    //   console.log(connection.isConnected());

    //   await channel.assertExchange(exchange, 'direct', { durable: false });
    //   // console.log(channel);
    //   // Publish the message
    //   channel.publish(exchange, routingKey, message);
    //   console.log(`Sent message: ${message}`);
    // } finally {
    //   await connection.close();
    //   await channel.close();
    // }
    return 'channel';
  }
}
