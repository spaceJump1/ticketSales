import { Injectable } from '@angular/core';
import { ITours } from 'src/app/models/tours';
import { Observable } from 'rxjs';
import { TicketRestService } from '../rest/ticket-rest.service';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private ticketRestService: TicketRestService) { }

  getTickets(): Observable<ITours[]> {
    return this.ticketRestService.getTickets();
  }
}
