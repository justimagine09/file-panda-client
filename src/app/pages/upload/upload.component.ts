import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  param: 'mp4' | 'jpg' = 'mp4';
  
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap
    .pipe(untilDestroyed(this))
    .subscribe(param => {
      const paramValue: any = (param.get('param') || '').toLocaleLowerCase();

      if (['mp4', 'jpg'].includes(paramValue)) {
        this.param = paramValue;
      }
    });
  }

  ngOnDestroy() {
    // need for until destroyed

  }

}
