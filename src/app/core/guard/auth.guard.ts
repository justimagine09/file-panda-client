import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import { EPages } from 'src/app/models/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authServive: AuthService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      return this.authServive.refreshToken()
      .pipe(map(value => {
        return true;
      }, catchError(() => {
        return from(this.router.navigate(['/', 'auth']));
      })));
    } catch(e) {
      return from(this.router.navigate(['/', 'auth']));
    }
  }
}
