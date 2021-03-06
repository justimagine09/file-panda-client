import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mp4-form',
  templateUrl: './mp4-form.component.html',
  styleUrls: ['./mp4-form.component.scss']
})
export class Mp4FormComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  files: File[] = [];

  thumbnails: Array<{objectUrl?: any, file?: any, blob?: any, type?: string}> = [];

  thumbnail = null;

  selectedIndex = 0;

  uploadProgress = 0;
  isUploading = false;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onAddedNewThumbnail(event) {
    this.thumbnails.push({
      objectUrl: URL.createObjectURL(event.addedFiles[0]),
      file: event.addedFiles[0],
      type: 'file'
    });

    this.selectedIndex = this.thumbnails.length - 1;
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.takeSnapshot(event.addedFiles[0]);
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async uploadFile() {
    if (this.isUploading) {
      return;
    }

    this.uploadProgress = 0;
    this.isUploading = true;

    this.isUploading = true;

    const fb = new FormData();
    fb.append('title', this.form.value.title);
    fb.append('description', this.form.value.description);
    fb.append('video', this.files[0], 'video/mp4');
    fb.append('thumbnail', this.thumbnails[this.selectedIndex].file || this.thumbnails[this.selectedIndex].blob);
    
    this.httpClient.post(environment.apiURL + '/file/upload/mp4', fb,
      {observe: 'events', reportProgress: true})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = (event.loaded / event.total);
      }

      if (event.type === HttpEventType.Response) {
        this.resetComponentValues();
      }
    }, err => this.isUploading = false);
  }

  resetComponentValues(){
    this.uploadProgress = 0;
    this.isUploading = false;
    this.form.reset();
    this.files = [];
    this.selectedIndex = 0;
    this.thumbnail = 0;
  }

  takeSnapshot(file) {
    const canvasElement = <HTMLCanvasElement> document.createElement('CANVAS');
    const video = document.createElement('video');
    const context = canvasElement.getContext('2d');
    video.src = URL.createObjectURL(file);
    
    const snapshot = () => {
      video.currentTime = 25;
      video.play();
      video.volume = 0;
      video.playbackRate = 9;

      let w: number, h: number, ratio: number;
      ratio = video.videoWidth / video.videoHeight;
      w = video.videoWidth - 100;
      h = w / ratio;
      canvasElement.width = w;
      canvasElement.height = h;
      context.fillRect(0, 0, w, h);
      context.drawImage(video, 0, 0, w, h);
      
      canvasElement.toBlob((blob) => {
        this.thumbnails.push({
          objectUrl: window.URL.createObjectURL(blob),
          blob
        });
      }, 'image/jpeg');

      setTimeout(() => {
        video.removeEventListener('canplay', snapshot);
      }, 2000);
    } ;

    video.addEventListener('canplay', snapshot);
  }

}
