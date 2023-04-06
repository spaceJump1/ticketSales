import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';

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


  constructor(private messageService: MessageService,
              private authService: AuthService
              ) { }

  ngOnInit(): void {
  }

  onRegAction(): void {
  }

  onReg(ev: Event): void | boolean {
    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity:'error', summary:'Service Message', detail:'Пароли не совпадают'});
      return false;
    }

     const userObj: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber,
      email: this.email
    }

    if (!this.authService.isUserExists(userObj)) {
      this.authService.setUser(userObj);
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Зарегистрированы успешно'});
      if(this.selectedValueReg) {
        let userString = JSON.stringify(userObj);
        window.localStorage.setItem('user'+userObj.login, userString);
      } else {
        this.messageService.add({severity:'warn', summary:'Service Message', detail:'Пользователь уже зарегистрирован'});
      }
  }
}
}
