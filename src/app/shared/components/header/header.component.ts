import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RouterStateService } from 'src/app/core/states/router-state.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router } from '@angular/router';
import { EPages } from 'src/app/models/enums';

const VISIBLE_HEADER_ROUTE = ['home', 'upload'];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navVisible = false;
  showSearch = false;

  constructor(private authService: AuthService, private routerState: RouterStateService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe();
  }
  ngOnInit() {
    this.routerState.currentUrl$
    .pipe(untilDestroyed(this))
    .subscribe(url => {
      this.showSearch = url === 'home';
      this.navVisible = VISIBLE_HEADER_ROUTE.includes(url);
    });
  }

  ngOnDestroy() {
    // needed for until destroyed;
  }

  navigateHome() {
    this.router.navigate(['/', EPages.HOME]).then();
  }

  navigateToUpload(fileType) {
    this.router.navigate(['/', EPages.UPLOAD, fileType]).then();
  }

}
