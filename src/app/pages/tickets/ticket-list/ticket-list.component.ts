import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { ITours, ITourTypeSelect  } from 'src/app/models/tours';
import { TicketStorageService } from 'src/app/services/ticket-storage/ticket-storage.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit {

  tourUnsubscriber: Subscription;

  tickets: ITours[] = [];
  ticketCopy: ITours[];
  loadCountBlock = false;
  directiveReady = false;

  searchTicketSub: Subscription;
  ticketSearchValue: string;


  filterData: {type: ITours[] | null} = {
    type: null
  }


  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;



  constructor(private ticketService: TicketsService,
              private ticketStorage: TicketStorageService,
              private router: Router,
              private http: HttpClient
              ) { }

  ngOnInit(): void {
    // this.ticketService.getTickets().subscribe(
    //   (data) => {
    //     this.tickets = data;
    //     this.ticketCopy = [...this.tickets];
    //     this.ticketStorage.setStorage(data);
    //
    //     setTimeout(() => {
    //       this.blockDirective.updateItems();
    //       this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
    //     });
    //   }
    // );

    this.ticketService.ticketUpdateSubject$.subscribe((data) => {
      this.tickets = data;
    })

    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data: ITourTypeSelect) => {

      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketCopy];
          break;

      }

      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketCopy.filter((el) => el.date === dateValue);
      }
      this.filterData.type = [...this.tickets];
      setTimeout(() => {
        this.blockDirective.updateItems();
        this.blockDirective.initStyle(0);
      })
    });
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});

    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
        if(this.ticketSearchValue) {
          this.tickets = this.ticketCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
        } else {
          this.tickets = [...this.ticketCopy];
        }
      });
   }

  goToTicketInfoPage(item: ITours) {
    this.router.navigate([`/tickets/ticket/${item._id}`])
  }

  // findTours(ev: Event): void {
  //   // console.log('ev', ev);
  //   const searchValue = (<HTMLInputElement>ev.target).value;

  //   if (searchValue) {
  //     this.tickets = this.ticketCopy.filter((el)=> el.name.toLowerCase().indexOf(searchValue.toLowerCase())!== -1);
  //   } else {
  //     this.tickets = [...this.ticketCopy];
  //   }
  // }

  diretiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #f1f1d9');
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }
}
