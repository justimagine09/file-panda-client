import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-jpg-form',
  templateUrl: './jpg-form.component.html',
  styleUrls: ['./jpg-form.component.scss']
})
export class JpgFormComponent implements OnInit {
  files = [];

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  isUploading = false;
  uploadProgress = -80;
  uploadScaleXProgress = 0;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }
  uploadFile() {
    if (this.isUploading) {
      return;
    }

    this.isUploading = true;

    const fb = new FormData();
    fb.append('title', this.form.value.title);
    fb.append('description', this.form.value.description);
    fb.append('image', this.files[0], 'image/jpeg');

    this.httpClient.post(environment.apiURL + '/file/jpg', fb,
      {observe: 'events', reportProgress: true})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = ((event.loaded / event.total) * 200) - 80;
        this.uploadScaleXProgress = (event.loaded / event.total) * 1;
      }

      if (event.type === HttpEventType.Response) {
        this.isUploading = false;
        this.uploadProgress = 0;
        this.uploadScaleXProgress = 0;
      }
    }, err => this.isUploading = false);
  }
}
