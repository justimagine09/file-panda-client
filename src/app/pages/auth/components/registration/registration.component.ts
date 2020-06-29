import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.initRegistrationForm();
  }

  initRegistrationForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.controls.confirmPassword.setValidators([Validators.required, this.isEqualTo(this.controls.password)]);

    this.controls.password.valueChanges
    .pipe(untilDestroyed(this))
    .subscribe(e => {
      if (this.controls.confirmPassword.touched) {
        this.controls.confirmPassword.updateValueAndValidity();
      }
    });
  }

  setViewStateToRegister() {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { type: 'login' }
      }
    );
  }

  get controls() {
    return this.registrationForm.controls;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  isEqualTo(targetControl: AbstractControl): ValidatorFn {
    return (c: AbstractControl) => {
        if (c.value !== targetControl.value) {
            return { isEqualTo: true };
        }

        return null;
    }
  }
}