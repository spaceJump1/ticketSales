import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { flatMap } from 'rxjs';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config/config.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  selectedValueReg: boolean;
  showCardNumber: boolean;
  needToSave: boolean = false;


  constructor(private messageService: MessageService,
              private authService: AuthService,
              private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  onRegAction(): void {
  }

  onReg(ev: MouseEvent): void | boolean {

    if (this.psw != this.pswRepeat) {
      this.messageService.add({severity: 'error', summary: 'Service Message', detail: 'Пароли не совпадают'});
      return false;
    }

    const userObj: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber,
      email: this.email
    }

    // const userNest = {
    //   age: 30,
    //   name: 'Test'
    // }

    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (this.needToSave) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_' + userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});

    }, () => {
      this.messageService.add({severity: 'warn', summary: 'Пользователь уже зарегистрирован'});
    });

    //   const isReg = this.authService.saveUser(userObj);
    //
    //   if (isReg.status) {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: `Пользователь зарегистрирован`,
    //     })
    //   }
    //
    //   if(this.needToSave) {
    //     this.authService.saveUser(userObj);
    //     this.messageService.add({
    //       severity: 'success',
    //         summary: `Пользователь сохранен `,
    //     });
    //     return true;
    //   }
    // }

    // removeUserFromStorage(ev: MouseEvent) {
    //   this.authService.rememberUser();
    // }
  }
}
