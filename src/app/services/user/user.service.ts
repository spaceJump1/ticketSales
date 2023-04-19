import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;
  private token: string;

  constructor() { }

  getUser(): IUser {
    return this.user;
  };

  setUser(user: IUser) {
    this.user = user;
  };

  setToken (token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

}
