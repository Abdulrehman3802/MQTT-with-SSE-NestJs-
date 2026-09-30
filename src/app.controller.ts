import { Controller, Get, Res, Req, Sse ,MessageEvent, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, MqttContext, Payload, Transport,} from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject, interval, map} from 'rxjs';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ){}

  // Subscribed topic will be in MessagePattern 
  @MessagePattern('sensor/#')
  getNotifications(@Payload() data: any) {
    console.log(data,'asdasdsad');
     return this.appService.getSubject().next(data)
    }
    @Sse('/sse/:id')
    sse(@Param('id') id: string): Observable<MessageEvent> {
      return new Observable((observer) => {
        // Subscribe to the subject from the AppService
        const subscription = this.appService.getSubject().subscribe((data) => {
          if (data.id === +id) {
            // Send the data to the SSE client only if the ID matches
            console.log(JSON.stringify(data));
            observer.next({ data: JSON.stringify(data) });
          }
        });
    
        // Clean up the subscription when the client disconnects
        return () => subscription.unsubscribe();
      });
    }
    
  
    
}