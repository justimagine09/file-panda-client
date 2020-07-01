import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchFilesComponent } from './components/search-files/search-files.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SafePipe } from './pipe/safe.pipe';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchFilesComponent,
        SafePipe,
    ],
    imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SafePipe
    ],
    providers: [SafePipe]
})
export class SharedModule {}
