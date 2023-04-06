import { Component, OnInit } from '@angular/core';
import { IMenuType } from 'src/app/models/menuType';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  public selectedType: IMenuType;

  constructor() { }

  ngOnInit(): void {
  }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

}
