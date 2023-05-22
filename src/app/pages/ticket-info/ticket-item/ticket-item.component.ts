import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, fromEvent } from 'rxjs';
import { INearestTour, ITourLocation, ITours } from 'src/app/models/tours';
import { IUser } from 'src/app/models/users';
import { TicketStorageService } from 'src/app/services/ticket-storage/ticket-storage.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { UserService } from 'src/app/services/user/user.service';
import {IOrder} from "../../../models/order";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITours | undefined;

  user: IUser;
  userForm: FormGroup;

  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];

  searchTicketSub: Subscription;
  ticketRestSub: Subscription;

  ticketSearchValue: string;

  searchTypes = [1, 2, 3];

  @ViewChild('ticketSearch') ticketSearch: ElementRef

  constructor(
    private ticketStorage: TicketStorageService,
    private route: ActivatedRoute,
    private userService: UserService,
    private ticketService: TicketsService
  ) { }


  ngOnInit(): void {
    this.user = this.userService.getUser();


    // init formGroup
    this.userForm = new FormGroup ({
      firstName: new FormControl ('aa', {validators: Validators.required}),
      lastName: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl (''),
      birthDay: new FormControl (''),
      age: new FormControl(22),
      citizen: new FormControl('')
    });


    // get nearest tours
    // forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe(data => {
    //   this.nearestTours = data[0];
    //   this.toursLocation = data[1];
    // })

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      const [nearestToursData, toursLocationData] = data;
      this.toursLocation = toursLocationData;
      this.nearestTours = this.ticketService.transformData(nearestToursData, toursLocationData);
    });

    //params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;

    if (paramValueId) {

      this.ticketService.getTicketsById(paramValueId).subscribe((data) => {
        this.ticket = data
      });
      // const ticketStorage = this.ticketStorage.getStorage();
      // this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      // console.log('this.ticket', this.ticket);
    }
  }

  ngAfterViewInit(): void {

    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour();
    });

  }

  initSearchTour(): void {
    const type = Math.floor(Math.random() * this.searchTypes.length);
    if(this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation);
    });

  }


  ngOnDestroy() {
    this.searchTicketSub.unsubscribe();
  }

  onSubmit(): void {

  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    // console.log('postData', postData);
    // console.log('this.userForm.getRawValue()', this.userForm.getRawValue());

    const userId = this.userService.getUser()?.id || null;
    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
    }
    this.ticketService.sendTourData(postObj).subscribe()
  }

  selectDate(ev: Event): void {

  }
}
