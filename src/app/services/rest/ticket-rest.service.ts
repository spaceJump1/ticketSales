import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITours } from 'src/app/models/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) { }

  getTickets(): Observable<ITours[]> {
    return this.http.get<ITours[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/')
  }
}
