import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {

  // Create a private subject to handle message events
  private subject = new Subject<MessageEvent>();

  // Method to get the subject
  getSubject(): Subject<object> {
    return this.subject;
  }
}
