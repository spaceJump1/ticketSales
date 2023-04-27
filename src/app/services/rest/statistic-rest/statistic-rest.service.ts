import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStatisticUser } from 'src/app/models/statistic';
import { Observable } from 'rxjs';
import { IsActiveMatchOptions } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StatisticRestService {

  constructor (private http: HttpClient) { }

  getUserStatistic(): Observable<IStatisticUser[]> {
    return this.http.get<IStatisticUser[]>('https://jsonplaceholder.typicode.com/users');
  }
  
}
