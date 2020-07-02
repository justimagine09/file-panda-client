import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateService } from 'src/app/core/states/app-state.service';
import { BehaviorSubject } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap, debounceTime, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-files',
  templateUrl: './search-files.component.html',
  styleUrls: ['./search-files.component.scss']
})
export class SearchFilesComponent implements OnInit, OnDestroy {
  isMobileSearchOpen = false;
  mobileSearch$$ = new BehaviorSubject<string>('');
  results = [];

  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.mobileSearch$$.asObservable()
      .pipe(
        untilDestroyed(this),
        debounceTime(300),
        switchMap(value => this.appStateService.searchFileMobileMode())
      ).subscribe((res: any) => {
        this.results = res.body;
      });
  }

  ngOnDestroy() {}

  openMobileSearch() {
    this.isMobileSearchOpen = true;
  }

  closeMobileSearch() {
    this.isMobileSearchOpen = false;
  }

  searchFileMobileMode($el) {
    this.mobileSearch$$.next($el.value);
    this.appStateService.search($el.value);
  }

  searchFilesDesktopMode($el) {
    this.appStateService.search($el.value);
  }

  getFullPath(value) {
    return environment.uploadsUrl + (value.thumbnail_small);
  }

}
