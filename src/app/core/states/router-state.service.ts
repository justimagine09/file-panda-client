import { Injectable, OnDestroy } from '@angular/core';
import { Router, RouteConfigLoadStart, NavigationEnd } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject } from 'rxjs';
import { ERouterState } from 'src/app/models/enums';

@Injectable({
  providedIn: 'root'
})
export class RouterStateService implements OnDestroy {
  private state$$ = new BehaviorSubject<ERouterState>(null);
  readonly state$ = this.state$$.asObservable();
  
  private currentUrl$$ = new BehaviorSubject<string>(null);
  readonly currentUrl$ = this.currentUrl$$.asObservable();

  constructor(private router: Router) {
    router.events
    .pipe(untilDestroyed(this)).subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.state$$.next(ERouterState.START);
      } else if (event instanceof NavigationEnd) {
        this.state$$.next(ERouterState.END);
        const urls = this.router.url.split('/');
        
        this.currentUrl$$.next(urls[1]);
      }
    });
  }

  ngOnDestroy() {
    // needed for untilDestroyed
  }
}
