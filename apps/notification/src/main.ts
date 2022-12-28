import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
  Logger.log('Notification service started on port ', 3002);
}
bootstrap();
