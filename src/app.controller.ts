import { Controller, Get, Res, Req, Sse ,MessageEvent} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, MqttContext, Payload, Transport,} from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject, interval, map} from 'rxjs';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ){}

  // Subscribed topic will be in MessagePattern 
  @MessagePattern('/sensor/#')
  getNotifications(@Payload() data: object) {
    console.log(data,'asdasdsad');
     return this.appService.getSubject().next(data)
    }
    @Sse('/sse')
    sse(): Observable<MessageEvent> {
      return new Observable((observer) => {
        // Subscribe to the subject from the AppService
        const subscription = this.appService.getSubject().subscribe((data) => {
          // Send the data to the SSE client
          console.log(JSON.stringify(data));
          observer.next({ data: JSON.stringify(data) });
        });
    
        // Clean up the subscription when the client disconnects
        return () => subscription.unsubscribe();
      });
    }
    
}