import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/interfaces/i-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';
import { IAuthToken, IRegisterParam, IRegistrationResponse } from 'src/app/models/interfaces';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  readonly user$: Observable<IUser> = this.user$$.asObservable();

  private token$$: BehaviorSubject<IAuthToken> = new BehaviorSubject<IAuthToken>(null);
  readonly token$: Observable<IAuthToken> = this.token$$.asObservable();

  constructor(private httpClient: HttpClient) {}

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
      })
    );
  }
}
