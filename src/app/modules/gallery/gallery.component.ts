import { Component, OnInit, Input, Output } from '@angular/core';
import { IFile } from 'src/app/models/interfaces';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  dataColumns: Array<Array<Array<IFile>>> = [];

  @Input() set data(datas: any[]) {
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

  delete() {
    alert('delete');
  }

  edit() {
    alert('edit');
  }
}
