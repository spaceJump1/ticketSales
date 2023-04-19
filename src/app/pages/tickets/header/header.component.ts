import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IMenuType } from 'src/app/models/menuType';
import { IUser } from 'src/app/models/users';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {

  items: MenuItem[];
  time: Date;
  private timerInterval: number;
  private settingsActive: boolean = false;
  public user: IUser;
  
  @Input() menuType: IMenuType;

  constructor (
    private UserService: UserService
  ) { 

  }

  initMenu() {

  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink:['settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth']
      },
    ];
  }

  ngOnInit() {
    this.items = [
        {
            label: 'Билеты',
            routerLink:['tickets-list']
            
        },
        {
          label: 'Выйти',
          routerLink:['/auth']
          
      },
    ];

    this.user = this.UserService.getUser();

    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000)


  }

  ngOnDestroy(): void {

    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }

  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
 }
}
