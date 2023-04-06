import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {

  constructor() { }

  initObservable(): void {
    const observable = new Observable((subscriber => {
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(() => {
        subscriber.next('asyncData');
        subscriber.error('some error here');
      }, 3000)

    }))

    const sub = observable.subscribe((data) => {
      console.log('observable data', data);
    }, (error => {
      console.log('error', error);
    }))

    // sub.unsubscribe()
  }
}
