import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('NOTIFY_SERVICE') private readonly client: ClientProxy) {}
  async getHello(): Promise<string> {
    // need to use async because we need to wait recieved data
    //const recieve = await this.client.send<number>('notify', { user: 'Austin', data: { a: 1, b: 2 } }).toPromise(); // notify if mapped key will used to in other hand
    // without toPromise function will return Observable and will not see execute before subscribe so when convert to Promise will recieve data in variable

    // The transporters support two methods: send() (for request-response messaging) and emit() (for event-driven messaging)
    const receive = await lastValueFrom(
      this.client.send<number>('notify', {
        user: 'Austin',
        data: { a: 1, b: 2 },
      }),
    );
    return '\t add 1+2=' + receive;
  }
}

// previous code:
// this.httpService.get(serviceUrl).toPromise();

// new code:
// lastValueFrom(this.httpService.get(serviceUrl))
