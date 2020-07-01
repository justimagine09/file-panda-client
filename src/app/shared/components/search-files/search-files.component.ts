import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-files',
  templateUrl: './search-files.component.html',
  styleUrls: ['./search-files.component.scss']
})
export class SearchFilesComponent implements OnInit {
  isMobileSearchOpen = false;

  constructor() { }

  ngOnInit() {
  }

  openMobileSearch() {
    this.isMobileSearchOpen = true;
  }

  closeMobileSearch() {
    this.isMobileSearchOpen = false;
  }

}
