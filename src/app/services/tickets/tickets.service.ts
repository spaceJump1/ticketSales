import { Injectable } from '@angular/core';
import { ICustomTicketData, INearestTour, ITourLocation, ITours } from 'src/app/models/tours';
import { Observable, Subject, Subscription, map } from 'rxjs';
import { TicketRestService } from '../rest/ticket-rest.service';
import { ITourTypeSelect } from 'src/app/models/tours';



@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  customTicketData: ICustomTicketData[];


  private ticketSubject = new Subject<ITourTypeSelect>();
  // readonly ticketType$ = this.ticketSubject.asObservable(); 


  constructor(private ticketRestService: TicketRestService) { }

  getTickets(): Observable<ITours[]> {
    return this.ticketRestService.getTickets().pipe(map(

      (value) => {
        const singleTour = value.filter((el) => el.type === 'single');
        return value.concat(singleTour);
      }

    ));
  }

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


  sendTourData(data: any): Observable<any> {
    return this.ticketRestService.sendTourData(data);
  }

}
