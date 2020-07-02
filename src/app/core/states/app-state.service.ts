import { Injectable, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ERouterState } from 'src/app/models/enums';
import { debounceTime, retry, switchMap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFile } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppStateService implements OnDestroy {
  private state$$ = new BehaviorSubject<IFile[]>([]);
  readonly state$ = this.state$$.asObservable();

  private search$$ = new BehaviorSubject<string>('');
  readonly search$ = this.search$$.asObservable();

  private fileExtension$$ = new BehaviorSubject<string>('');
  readonly fileExtension$ = this.fileExtension$$.asObservable();

  private fileExtensionsList$$ = new BehaviorSubject<any[]>([]);
  readonly fileExtensionsList$ = this.fileExtensionsList$$.asObservable();

  constructor(private httpClient: HttpClient) {
    this.observeSearchAndFileExtension();
    this.getFileExtension();
  }

  getFileExtension() {
    this.httpClient.get(environment.apiURL + '/file_types', {observe: 'response'})
    .pipe(retry(10))
    .subscribe((response: HttpResponse<any>) => this.fileExtensionsList$$.next(response.body));
  }

  /**
   * Seaech file on seach text state and fileExtension state changed
   */
  observeSearchAndFileExtension() {
    combineLatest([this.search$, this.fileExtension$])
    .pipe(
      untilDestroyed(this), debounceTime(300),
      switchMap(([search, fileExtension]) => {
       return this.httpClient.get(environment.apiURL + '/file/search',
              {params: {text: search, file_type: fileExtension}, observe: 'response'});
      }))
    .subscribe((response: HttpResponse<IFile[]>) => {
      this.state$$.next(response.body);
    }, err => this.observeSearchAndFileExtension());
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
