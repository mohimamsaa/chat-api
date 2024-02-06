## Description

Chat API Using NestJS, WebSocket for communication, RabbitMQ for Message Queueing and MongoDb

## Installation

- Use command below to create and run docker image
```bash
$ docker-compose up -d
```

- Create .env file and fill value with your environtment
```bash
MONGO_CONNECTION_STRING=your_mongo_conn
RABBITMQ_AMQP_URL=your_rabbitmq_url
```
- Install dependencies
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Muhammad Imam Santosa

## License

Nest is [MIT licensed](LICENSE).
