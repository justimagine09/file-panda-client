import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateService } from 'src/app/core/states/app-state.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, catchError, switchMap } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IFile } from 'src/app/models/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  fileExtensions = [];
  appState = [];
  
  constructor(private appStateService: AppStateService) {
    this.observeFileExtension();

    combineLatest([
      this.appStateService.search$, this.appStateService.fileExtension$])
    .pipe(
      untilDestroyed(this), debounceTime(300),
      switchMap(value => this.appStateService.searchFiles().pipe(catchError(() => of([]))))
      ).subscribe((val: HttpResponse<IFile[]>) => {
        this.appState = val.body;
      });
  }

  observeFileExtension() {
    this.appStateService.fileExtensionsList$.pipe(untilDestroyed(this))
    .subscribe(ext => this.fileExtensions = ext);
  }

  ngOnInit() {}

  ngOnDestroy() {}

  categoryChanged($value) {
    this.appStateService.setFileExtension($value);
  }

}
