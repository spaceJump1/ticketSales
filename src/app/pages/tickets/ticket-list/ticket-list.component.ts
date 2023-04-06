import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { ITours } from 'src/app/models/tours';
import { TicketStorageService } from 'src/app/services/ticket-storage/ticket-storage.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit {

  tickets: ITours[];
  ticketCopy: ITours[];

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(private ticketService: TicketsService,
              private ticketStorage: TicketStorageService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);

        // setTimeout(() => {
        //   this.blockDirective.initStyle(3)
        // })
      }
    );
  }

  ngAfterViewInit() { }

  goToTicketInfoPage(item: ITours) {
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  findTours(ev: Event): void {
    console.log('ev', ev);
    const searchValue = (<HTMLInputElement>ev.target).value;

    if (searchValue) {
      this.tickets = this.ticketCopy.filter((el)=> el.name.indexOf(searchValue)!== -1);
    } else {
      this.tickets = [...this.ticketCopy];
    }
  }


  diretiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #f1f1d9');
  }



}
