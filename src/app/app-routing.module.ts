import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EPages } from './models/enums';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: EPages.AUTH},
  {path: EPages.AUTH, loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {path: EPages.HOME, loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path: EPages.UPLOAD, loadChildren: () => import('./pages/upload/upload.module').then(m => m.UploadModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
