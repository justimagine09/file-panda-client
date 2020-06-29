import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loaded = false;
  isViewLogin = true;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [Validators.required],
      confirmPassword: [this.confirmPasswordValidator]
    });
  }

  ngOnInit() {
    this.loaded = true;
  }

  setViewStateToLogin() {
    this.isViewLogin = true;
  }

  setViewStateToRegister() {
    this.isViewLogin = false;
  }

   confirmPasswordValidator(control: AbstractControl) {
    console.log(control.value);
  }

}
