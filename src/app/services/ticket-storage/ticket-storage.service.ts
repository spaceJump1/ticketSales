import { Injectable } from '@angular/core';
import { ITours } from 'src/app/models/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketStorageService {

  private ticketStorage: ITours[];

  constructor() { }

  setStorage(data: ITours[]): void {
    this.ticketStorage = data;
  }

  getStorage(): ITours[] {
    return this.ticketStorage;
  }

}
