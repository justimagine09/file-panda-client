import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { Mp4FormComponent } from './components/mp4-form/mp4-form.component';
import { JpgFormComponent } from './components/jpg-form/jpg-form.component';
import { PdfFormComponent } from './components/pdf-form/pdf-form.component';


@NgModule({
  declarations: [UploadComponent, Mp4FormComponent, JpgFormComponent, PdfFormComponent],
  imports: [
    CommonModule,
    UploadRoutingModule
  ]
})
export class UploadModule { }
