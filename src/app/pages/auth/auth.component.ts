import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  loaded = false;
  isViewLogin = true;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.observeParam();
   }

   observeParam() {
     this.activatedRoute.queryParamMap
     .pipe(untilDestroyed(this))
     .subscribe(param => {
      this.isViewLogin = param.get('type') !== 'register';
     });
   }

   ngOnDestroy() {
     // needed for untilDestroyed operator
   }
}
