import { ArgumentsHost, Catch } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsFilter {
  public catch(exception: WsException, host: ArgumentsHost) {
    // Here you have the exception and you can check the data

    const ctx = host.switchToWs();
    const client = ctx.getClient() as WebSocket;
    client.send(
      JSON.stringify({
        exception,
      }),
    );
  }
}
