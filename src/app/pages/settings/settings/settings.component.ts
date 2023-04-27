import { Component, OnDestroy, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  oldPsw: string;
  newPsw: string;
  confirmPsw: string;

  private subjectScope = this.observableExampleService.getSubject();
  private subscription: Subscription;
  private subjectUnsubscribe: Subscription;

  // settingsData: Subscription;
  // settingsDataSubject: Subscription;
  
  subjectForUnsubscribe = new Subject();

  constructor(private observableExampleService: ObservableExampleService,
              private settingsService: SettingsService,
              private authService: AuthService,
              private messageService: MessageService) { }

  isTabCaching: boolean = false;


  ngOnInit(): void {
  //settingsData observable
  //  this.settingsData = this.settingsService.loadUserSettings().subscribe((data) => {
  //   console.log('settings data', data);
  //  });


  //  //settings data subject
  //  this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable().pipe(take(1)).subscribe(
  //   (data) => {
  //     console.log('settings data from subject', data)
  //   })

  //takeUntil
  // this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
  //   console.log('takeUntil settings data', data);
  // });

  // this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
  //   (data) => {
  //     console.log('settings data from subject', data)
  //   });
  }


  changePassword() {
    this.isTabCaching = true;
    if (this.confirmPsw != this.newPsw) return;
    const chgPsw = this.authService.changePassword(this.oldPsw, this.newPsw);
    if (chgPsw) {
      this.messageService.add({
        severity: 'success',
        summary: `Пароль успешно изменен`,
      });
      this.isTabCaching = false;
      this.oldPsw = '';
      this.newPsw = '';
      this.confirmPsw = '';
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Пароль не удалось изменить',
      });
    }
  }

  ngOnDestroy(): void {
    // this.settingsData.unsubscribe();

    // this.subjectForUnsubscribe.next(true);
    // this.subjectForUnsubscribe.complete();

  }
}
