import { Injectable, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ERouterState } from 'src/app/models/enums';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppStateService implements OnDestroy {
  private state$$ = new BehaviorSubject<ERouterState>(null);
  readonly state$ = this.state$$.asObservable();

  private search$$ = new BehaviorSubject<string>('');
  readonly search$ = this.search$$.asObservable();

  private fileExtension$$ = new BehaviorSubject<string>('');
  readonly fileExtension$ = this.fileExtension$$.asObservable();

  private fileExtensionsList$$ = new BehaviorSubject<string[]>([]);
  readonly fileExtensionsList$ = this.fileExtensionsList$$.asObservable();

  constructor() {
    this.observeSearchAndFileExtension();
    this.getFileExtension();
  }

  getFileExtension() {
    // to do
  }

  observeSearchAndFileExtension() {
    combineLatest([this.search$, this.fileExtension$])
    .pipe(untilDestroyed(this), debounceTime(500))
    .subscribe(([search, fileExtension]) => {
      console.log(search);
    });
  }

  search(value: string) {
    this.search$$.next(value);
  }

  changeCategory(value: string) {
    this.fileExtension$$.next(value);
  }

  ngOnDestroy() {
    // needed for untilDestroyed
  }
}
