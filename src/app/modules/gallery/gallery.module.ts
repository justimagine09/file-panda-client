import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule, SharedModule, MatButtonModule, MatIconModule
  ],
  declarations: [GalleryComponent],
  exports: [GalleryComponent],
})
export class GalleryModule { }
