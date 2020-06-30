import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.token$
    .pipe(take(1), switchMap(value => {
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${value ? value.access_token : environment.guestToken}`
            }
          });

        return next.handle(request);
    }));
  }
}
