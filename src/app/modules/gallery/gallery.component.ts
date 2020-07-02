import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { IFile } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';
import { AppStateService } from 'src/app/core/states/app-state.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  dataColumns: Array<Array<Array<IFile>>> = [];

  selectedVideo;
  selectedImage;

  @Input() set data(datas: any[]) {
    console.log(datas);
    if (datas === undefined) {
      return;
    }

    const columns = [[], [], [], []];
    let roundsCount = 0;
    // Put the files in each column
    datas.forEach(file_ => {
      columns[roundsCount].push(file_);
      roundsCount++;

      if (roundsCount > 3) {
        roundsCount = 0;
      }
    });

    this.dataColumns = columns;
  }

  constructor(private appStateService: AppStateService) { 
    this.observeSelectedFile();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Needed for untilDestroyed
  }

  observeSelectedFile() {
    this.appStateService.selectedVideo$.pipe(untilDestroyed(this))
    .subscribe(value => this.selectedVideo = value);
    
    this.appStateService.selectedImage$.pipe(untilDestroyed(this))
    .subscribe(value => this.selectedImage = value);
  }

  selectFile(item) {
    this.appStateService.selectFile(item);
  }

  clearSelectedFile() {
    this.appStateService.clearSelectedFile();
  }

  getFullPath(value) {
    return environment.uploadsUrl + value;
  }
}
