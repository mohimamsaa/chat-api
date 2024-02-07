## Description

Chat API Using NestJS, WebSocket for communication, RabbitMQ for Message Queueing and MongoDb

## Installation

- Use command below to configure terraform network

```bash

$ terraform init

$ terraform apply
```

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
```

## Usage

- Open Postman
- Create First User with endpoint and save userId on response

```bash
POST http://localhost:3000/user
{
    "email": "test.user1@mail.com",
    "password": "password"
}
```

- Create Second User with endpoint and save userId on response

```bash
POST http://localhost:3000/user
{
    "email": "test.user2@mail.com",
    "password": "password"
}
```

- Create websocket connection for user 1 using postman

```bash
url ws://localhost:3000
header {
  x-user-id: "user-id-1"
}
```

- Create another websocket connection for user 2 using postman

```bash
url ws://localhost:3000
header {
  x-user-id: "user-id-2"
}
```

- Send message with event "message" with user1 through websocket connection and then the message should appear on user2 websocket connection

```bash
Example Payload Message
{
    "recipientId": string,
    "message": string,
    "senderId": string
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Muhammad Imam Santosa

## License

Nest is [MIT licensed](LICENSE).
