import { Component, OnDestroy, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  private subjectScope = this.observableExampleService.getSubject();
  private subscription: Subscription;
  private subjectUnsubscribe: Subscription;
  
  isTouched:boolean = false;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private observableExampleService: ObservableExampleService) { }

  ngOnInit(): void {
    this.subjectUnsubscribe = this.subjectScope.subscribe(data => console.log(data));

    this.subjectScope.next('hello');

  }



  changePassword() {
    // this.isTouched=true;
    // if (this.confirmPassword! = this.newPassword) return;

    // const res = this.authService.changePassword(this.oldPassword,this.newPassword);

    // if (res) {
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: `Пароль успешно изменен`,
    //   });
      
    //   this.isTouched=false;
    //   this.oldPassword='';
    //   this.newPassword='';
    //   this.confirmPassword='';
    // } else {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Пароль не удалось изменить',
    //   });
    // }

  }

  ngOnDestroy() {
    this.subjectUnsubscribe.unsubscribe();
  }
}
