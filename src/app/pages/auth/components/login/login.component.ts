import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginLoading = false;

  isUnAuthorized = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
    ) {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  setViewStateToRegister() {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { type: 'register' }
      }
    );
  }

  ngOnInit() {}

  login() {
    if (this.isLoginLoading) {
      return;
    }
    const formValues = this.loginForm.value;

    this.isLoginLoading = true;
    this.isUnAuthorized = false;

    this.authService.login(formValues.email, formValues.password)
    .subscribe(response => {
      this.router.navigate(['/', 'upload', 'mp4']).then();

      this.isLoginLoading = false;
    }, (err) => {
      this.isUnAuthorized = err.status === 401;

      this.isLoginLoading = false;
    });
  }
}
