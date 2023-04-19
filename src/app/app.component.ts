import { Component, OnInit } from '@angular/core';
import { ObservableExampleService } from './services/testing/observable-example.service';
import { ConfigService } from './services/config/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ticketSales2022';
  prop: string;

  constructor(private testing: ObservableExampleService,
    private config: ConfigService) {
    testing.initObservable()
    this.config.configLoad();
  }

  ngOnInit() {

    /* obs дает только подписаться (а для чего это?)*/
    // const myObservable = this.testing.getObservable();
    // myObservable.subscribe((data) => {
    //   console.log('test1', data)
    // });
    // myObservable.subscribe((data) => {
    //   console.log('test2', data)
    // });
    // myObservable.subscribe((data) => {
    //   console.log('test3', data)
    // });


    /* sub дает подписаться и отправку (обязательное условие, сначала подписаться - потом отправлять данные) */
    // const mySubject = this.testing.getSubject();
    // mySubject.subscribe((data) => {
    //   console.log('test4', data)
    // });
    // mySubject.subscribe((data) => {
    //   console.log('test5', data)
    // });

    // mySubject.next('subscribe value');
    // mySubject.next('subscribe value');


    /* bsub дает подписаться и отправку данных (можем сначала подписаться, а потом отправить данные и наоборот) */
    // const myBehavior = this.testing.getBehaviorSubject();

    // myBehavior.subscribe((data) => {
    //   console.log('first data', data)
    // });

    // // myBehavior.next('new data from behaviorSubject');
    // myBehavior.next('new data1 from behaviorSubject');

  }


}
