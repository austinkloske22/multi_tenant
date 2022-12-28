import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('notify')
  async notify(data: NotifiyData) {
    console.log('send');
    Logger.log('notificatoin data' + data.user);
    const a: number = data.data['a'];
    const b: number = data.data['b'];
    console.log(a, b);
    return a + b;
  }

  @Get()
  getHello(): string {
    return this.notificationService.getHello();
  }
}

interface NotifiyData {
  user: string;
  data: object;
}
