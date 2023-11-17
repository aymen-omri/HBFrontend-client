import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, map, switchMap } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

// const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/api/v1/auth')) {
      return next.handle(req);
    }
    else {
      let token = this.tokenService.getToken();
      console.log(token);
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token)
        });
        return next.handle(cloned);
      }
    }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];