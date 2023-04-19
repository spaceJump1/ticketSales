import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class RestInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hasToken = this.userService.getToken();

    if (hasToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + hasToken)
      });

      return next.handle(cloned);
    } else {
    return next.handle(request);
    }
  }
}
