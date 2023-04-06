import { Component } from '@angular/core';
import { ObservableExampleService } from './services/testing/observable-example.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ticketSales2022';
  prop: string;

  constructor(testing: ObservableExampleService) {
    testing.initObservable()
  }
}
