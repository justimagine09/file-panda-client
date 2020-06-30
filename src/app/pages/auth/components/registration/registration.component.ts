import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;

  emailErrors = [];
  isRegisterLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
    ) {
    this.initRegistrationForm();
  }

  get controls() {
    return this.registrationForm.controls;
  }

  initRegistrationForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    });

    this.controls.password_confirmation.setValidators([Validators.required, this.isEqualTo(this.controls.password)]);

    this.controls.password.valueChanges
    .pipe(untilDestroyed(this))
    .subscribe(e => {
      if (this.controls.password_confirmation.touched) {
        this.controls.password_confirmation.updateValueAndValidity();
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

  register() {
    if(this.isRegisterLoading) {
      return;
    }

    this.isRegisterLoading = true;
    this.emailErrors = [];

    this.authService.register(this.registrationForm.value)
    .subscribe(value => {
      this.isRegisterLoading = false;
    }, err => {
      if (((err || {error: null} as any).error || {error: null} as any).errors['email']) {
        this.emailErrors = err.error.errors['email'];
      }
      this.isRegisterLoading = false;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  isEqualTo(targetControl: AbstractControl): ValidatorFn {
    return (c: AbstractControl) => {
        if (c.value !== targetControl.value) {
            return { isEqualTo: true };
        }

        return null;
    };
  }
}
