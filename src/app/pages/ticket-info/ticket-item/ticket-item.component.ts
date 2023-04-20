import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { INearestTour, ITourLocation, ITours } from 'src/app/models/tours';
import { IUser } from 'src/app/models/users';
import { TicketStorageService } from 'src/app/services/ticket-storage/ticket-storage.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { UserService } from 'src/app/services/user/user.service';

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
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe(data => {
      this.nearestTours = data[0];
      this.toursLocation = data[1];
    })


    //params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;

    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket);
    }
  }

  ngAfterViewInit(): void {

    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);
    
  }

  onSubmit(): void {

  }

  selectDate(ev: Event): void {
    
  }



}
