import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../../../shared/pipe/safe.pipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mp4-form',
  templateUrl: './mp4-form.component.html',
  styleUrls: ['./mp4-form.component.scss']
})
export class Mp4FormComponent implements OnInit {
  files: File[] = [];

  thumbnails: Array<{objectUrl: any, file?: any, type: string}> = [];

  thumbnail = null;

  selectedIndex = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onAddedNewThumbnail(event) {
    this.thumbnails.push({
      objectUrl: URL.createObjectURL(event.addedFiles[0]),
      file: event.addedFiles[0],
      type: 'file'
    });

    console.log(event.addedFiles[0]);

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
    const fb = new FormData();
    fb.append('video', this.files[0], 'video/mp4');
    fb.append('thumbnail', this.thumbnails[this.selectedIndex].file || this.thumbnails[this.selectedIndex].blob);
    
    this.httpClient.post('http://localhost:8000/api/file', fb, {observe: 'response'})
    .subscribe(value => console.log(value), err => console.log(err));
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };
  
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
  
      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }
  
      reader.readAsDataURL(file);
    });
  }

  public takeSnapshot(file) {
    const canvasElement = <HTMLCanvasElement> document.createElement('CANVAS');
    const video = document.createElement('video');
    const context = canvasElement.getContext('2d');
    video.src = URL.createObjectURL(file);
    
    const snapshot = () => {
      video.currentTime = 25;
      video.play();
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

        console.log(this.thumbnails);

      }, 'image/jpeg');

      setTimeout(() => {
        video.removeEventListener('canplay', snapshot);
      }, 2000);
    } ;

    video.addEventListener('canplay', snapshot);
  }

}
