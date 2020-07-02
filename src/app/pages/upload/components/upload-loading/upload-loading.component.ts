import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpUploadProgressEvent } from '@angular/common/http';

const PANDA_DEFAULT_POSITION_OFFSET = 80;

@Component({
  selector: 'app-upload-loading',
  templateUrl: './upload-loading.component.html',
  styleUrls: ['./upload-loading.component.scss']
})
export class UploadLoadingComponent implements OnInit {
  httEventype: HttpEventType;

  isUploading = false;
  pandaAnimationProgress = 0;
  uploadScaleXProgress = 0;


  @Input()
  set uploadProgress(value: number) {
    console.log((value * 200) - PANDA_DEFAULT_POSITION_OFFSET);
    this.pandaAnimationProgress = (value * 200) - PANDA_DEFAULT_POSITION_OFFSET;
    this.uploadScaleXProgress = value * 1;
  }

  constructor() { }

  ngOnInit() {
  }

}
