import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { Mp4FormComponent } from './components/mp4-form/mp4-form.component';
import { JpgFormComponent } from './components/jpg-form/jpg-form.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UploadComponent, Mp4FormComponent, JpgFormComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MatButtonModule,
    NgxDropzoneModule,
    MatInputModule,
    MatIconModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class UploadModule { }
