import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITours } from 'src/app/models/tours';
import { TicketStorageService } from 'src/app/services/ticket-storage/ticket-storage.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITours | undefined;

  constructor(
    private ticketStorage: TicketStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;

    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket);
    }
  }
}
