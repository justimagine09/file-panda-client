import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
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
}
