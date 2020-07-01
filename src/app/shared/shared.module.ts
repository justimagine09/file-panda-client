import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchFilesComponent } from './components/search-files/search-files.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchFilesComponent,
    ],
    imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
    ]
})
export class SharedModule {}
