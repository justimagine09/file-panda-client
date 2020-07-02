import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './pages/auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './core/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AuthModule,
    MatIconModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private authService: AuthService) {}
 }
