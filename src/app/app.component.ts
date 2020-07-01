import { Component } from '@angular/core';
import { RouterStateService } from './core/states/router-state.service';
import { ERouterState } from './models/enums';
import { flatMap, delay, map } from 'rxjs/operators';
import { timer, of } from 'rxjs';
import { AppStateService } from './core/states/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  eRouterState = ERouterState;
  isRouterLoading$;

  constructor(public routerState: RouterStateService, private appStateService: AppStateService) {
    this.isRouterLoading$ = routerState
                                      .state$
                                      .pipe(flatMap(value => {
                                        if (value === ERouterState.END) {
                                          return timer(1000).pipe(map(() => false));
                                        }

                                        return of(true);
                                      }));
  }
}
