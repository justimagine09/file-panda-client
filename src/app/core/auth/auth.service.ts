import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/interfaces/i-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, flatMap, catchError } from 'rxjs/operators';
import { IAuthToken, IRegisterParam, IRegistrationResponse } from 'src/app/models/interfaces';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { EPages } from 'src/app/models/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  readonly user$: Observable<IUser> = this.user$$.asObservable();

  private token$$: BehaviorSubject<IAuthToken> = new BehaviorSubject<IAuthToken>(null);
  readonly token$: Observable<IAuthToken> = this.token$$.asObservable();

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {
    this.token$$.next({access_token: this.cookieService.get('token')} as IAuthToken);
  }

  register(data: IRegisterParam): Observable<HttpResponse<IAuthToken>> {
    return this.httpClient.post<IRegistrationResponse>(environment.apiURL + '/auth/register', data, {observe: 'response'})
    .pipe(tap(response => {
        this.user$$.next(response.body.user);
      }), flatMap(() => this.login(data.email, data.password)));
  }

  login(email: string, password: string): Observable<HttpResponse<IAuthToken>> {
    return this.httpClient.post<IAuthToken>(`${environment.apiURL}/auth/login`, {email, password}, {observe: 'response'})
    .pipe(
      tap((response: HttpResponse<IAuthToken>) => {
        this.token$$.next(response.body);
        this.cookieService.set('token', response.body.access_token);
      })
    );
  }

  refreshToken() {
    return this.httpClient.post<IAuthToken>(`${environment.apiURL}/auth/refresh`, {}, {observe: 'response'})
    .pipe(
      tap((response: HttpResponse<IAuthToken>) => {
        this.token$$.next(response.body);
        this.cookieService.set('token', response.body.access_token);
      }), catchError(e => this.router.navigate(['/', 'auth'])));
  }

  logout() {
    return this.httpClient.post(`${environment.apiURL}/auth/refresh`, {}, {observe: 'response'})
    .pipe(tap(() => this.router.navigate(['/', EPages.AUTH])));
  }
}
