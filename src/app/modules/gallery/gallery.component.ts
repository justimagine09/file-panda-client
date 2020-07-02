import { Component, OnInit, Input, Output } from '@angular/core';
import { IFile } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

  showFile(item) {
    // a video has a thumbnail
    // so we check if it has a thumbnail then file is a video

    if (!!item.thumbnail) {
      this.selectedVideo = item;
    } else {
      this.selectedImage = item;
    }
  }

  getFullPath(value) {
    return environment.uploadsUrl + value;
  }
}
