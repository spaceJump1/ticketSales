import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import {MessageService} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit, OnDestroy, OnChanges {
  loginText: string = 'Логин';
  pswText: string = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;

  @Input() inputProp = 'test';
  @Input() inputObj: any;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient
              ) { }



  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться';

  }

  ngOnDestroy(): void {
    // console.log('destroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
  }


  vipStatusSelect(): void {
  }


  onAuth(ev: Event): void {


    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }

    this.http.post<{ access_token: string, id: string}>('http://localhost:3000/users/'+authUser.login, authUser).subscribe((data) => {
      authUser.id = data.id;
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);
      // this.userService.setToStore(token);

      this.router.navigate(['tickets/tickets-list']);

    }, (err: HttpErrorResponse)=> {
      const serverError = <ServerError>err.error;
      this.messageService.add({severity:'warn',  summary: serverError.errorText});
    });

    // const storedPsw = localStorage.getItem('psw');

    // if (this.authService.checkUser(authUser)) {
    //   // console.log('auth true');
    //   this.UserService.setUser(authUser);
    //
    //   this.UserService.setToken('user-private-token');
    //
    //   this.router.navigate(['tickets/tickets-list']);
    // } else {
    //   console.log('auth false');
    //   this.messageService.add({severity:'error', summary:'Service Message', detail:'Неверные данные'});
    // }
  }
}
