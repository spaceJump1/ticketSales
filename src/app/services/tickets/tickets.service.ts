import { Injectable } from '@angular/core';
import { ICustomTicketData, INearestTour, ITourLocation, ITours } from 'src/app/models/tours';
import { Observable, Subject, Subscription, map } from 'rxjs';
import { TicketRestService } from '../rest/ticket-rest.service';
import { ITourTypeSelect } from 'src/app/models/tours';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  customTicketData: ICustomTicketData[];

  private ticketUpdateSubject = new Subject<ITours[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();


  private ticketSubject = new Subject<ITourTypeSelect>();
  // readonly ticketType$ = this.ticketSubject.asObservable();


  constructor(private ticketRestService: TicketRestService,
              private http: HttpClient) { }

  // getTickets(): Observable<ITours[]> {
  //   return this.ticketRestService.getTickets().pipe(map(
  //
  //     (value) => {
  //       const singleTour = value.filter((el) => el.type === 'single');
  //       return value.concat(singleTour);
  //     }
  //
  //   ));
  // }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
   }

   updateTour(type:ITourTypeSelect): void {
     this.ticketSubject.next(type);
   }

   getError() {
    return this.ticketRestService.getRestError();
   }

   getNearestTours(): Observable<INearestTour[]> {
    return this.ticketRestService.getNearestTickets();
   }

   getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketRestService.getLocationList();
   }

   transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] {
    const newTicketData: ICustomTicketData[] = [];
    data.forEach((el) => {
      const newEl = { ...el } as ICustomTicketData;
      newEl.region = regions.find((region) => el.locationId === region.id) as ITourLocation;
      newTicketData.push(newEl);
    });
    return newTicketData;
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    return this.ticketRestService.getRandomNearestEvent(type);
  }

  updateTicketList(data: ITours[]) {
    this.ticketUpdateSubject.next(data);
  }

  sendTourData(data: any): Observable<any> {
    return this.ticketRestService.sendTourData(data);
  }

  getTickets(): void {
      this.http.post<ITours[]>('http://localhost:3000/tours/', {}).subscribe((data) => {
      this.updateTicketList(data);
    });
  }

  getTicketsById(paramId: string): Observable<ITours> {
    return this.http.get<ITours>(`http://localhost:3000/tours/${paramId}`);
  }

}
