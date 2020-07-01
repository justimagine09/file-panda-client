import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../../../shared/pipe/safe.pipe';

@Component({
  selector: 'app-mp4-form',
  templateUrl: './mp4-form.component.html',
  styleUrls: ['./mp4-form.component.scss']
})
export class Mp4FormComponent implements OnInit {
  files: File[] = [];

  thumbnails = [];

  thumbnail = null;

  selectedIndex = 0;

  constructor() { }

  ngOnInit() {
  }

  onAddedNewThumbnail(event) {
    this.thumbnails.push({
      objectUrl: URL.createObjectURL(event.addedFiles[0]),
      file: event[0],
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
