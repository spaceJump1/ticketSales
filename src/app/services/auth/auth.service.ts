import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { UserService } from '../user/user.service';

export type AuthStatus = {
  status:boolean;
  message:string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usersStorage: IUser[] = [];


  constructor(private userService: UserService) {
    this.checkUsersInStorage();
    this.checkAuthInStorage();
   }

  checkUser(user: IUser): IUser | null {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);

    if (isUserExists && isUserExists.psw === user.psw) {
      return isUserExists; 
    }
    return null;
  }

  changePassword(oldPsw: string, newPsw: string): boolean {
    const user = this.userService.getUser();
    if(!user || user.psw != oldPsw) return false;
    user.psw = newPsw;
    this.saveUser(user);
    return true;
  }

  setUser(user: IUser): AuthStatus {
   
    if (!this.isUserExists(user) && user?.login) {
      this.usersStorage.push(user);
      this.saveUser(user);
      return {status: true, message: 'ok'};
    }
    return {status: false, message: 'Пользователь уже зарегистрирован'}
  }

  isUserExists(user: IUser): boolean {
    return Boolean(this.usersStorage.find((el) => el.login === user.login));
  }

  saveUser(user: IUser): any {
    let users: IUser[] = [];
    let usersJsonString = window.localStorage.getItem('users');

    if (usersJsonString) {
      const usersJson: IUser[] = JSON.parse(usersJsonString)??[];
      usersJson.forEach(item => users.push(item));
    }
    const updateIndex = users.findIndex(el => el.login == user.login);
    if (updateIndex != -1) {
      users.splice(updateIndex, 1, user);
    } else {
      users.push(user);
    }
    window.localStorage.setItem('users', JSON.stringify(users));
    return {status: true, message: 'Пользователь успешно сохранен'};
  }

  removeUsersFromLocalStorage(): void {
    window.localStorage.removeItem('users');
  }

  rememberUser() {
    window.localStorage.setItem('user',JSON.stringify(this.userService.getUser()));
  }
  removeUserFromStorage() {
    window.localStorage.removeItem('user');
  }

  checkAuthInStorage() {
    const userJsonString = window.localStorage.getItem('user');
    if (userJsonString){

      this.userService.setUser(JSON.parse(userJsonString));
    }
  }
  checkUsersInStorage() {
    const usersJsonString = window.localStorage.getItem('users');
    if (usersJsonString) {
      this.usersStorage = JSON.parse(usersJsonString) ?? [];
    }
  }
}
