import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/core/states/app-state.service';

@Component({
  selector: 'app-search-files',
  templateUrl: './search-files.component.html',
  styleUrls: ['./search-files.component.scss']
})
export class SearchFilesComponent implements OnInit {
  isMobileSearchOpen = false;

  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
  }

  openMobileSearch() {
    this.isMobileSearchOpen = true;
  }

  closeMobileSearch() {
    this.isMobileSearchOpen = false;
  }

  searchFilesDesktopMode($el) {
    this.appStateService.search($el.value)
  }

}
