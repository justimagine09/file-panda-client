import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateService } from 'src/app/core/states/app-state.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  fileExtensions = [];
  
  constructor(private appStateService: AppStateService) { 
    this.observeFileExtension();
  }

  observeFileExtension() {
    this.appStateService.fileExtensionsList$.pipe(untilDestroyed(this))
    .subscribe(ext => this.fileExtensions = ext);
  }

  ngOnInit() {}

  ngOnDestroy() {}

}
