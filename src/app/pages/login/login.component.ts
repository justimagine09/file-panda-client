import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loaded = false;
  isViewLogin = true;

  constructor() { }

  ngOnInit() {
    this.loaded = true;
  }

  setViewStateToLogin() {
    this.isViewLogin = true;
  }

  setViewStateToRegister() {
    this.isViewLogin = false;
  }

}
