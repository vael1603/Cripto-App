import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../interfaces/UserPassword';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string;
  lastName: string;
  logged: boolean
  showName = false;
  info: LoginResponse;

  constructor(private loginService: LoginService,
    private loginComponent: LoginComponent, private router: Router) {}

  ngOnInit(): void {
    this.loginService.sendInfoObservable.subscribe( res => {
      this.info = res;
      this.setInfo();
    })
  }

  setInfo(){
    if( this.info.logged == true ) {
      this.name = this.info.name;
      this.lastName = this.info.lastName;
      this.showName = true;
    } else {
      this.name = '';
      this.lastName = '';
      this.showName = false;
    }
  }

  logout(){
    this.info.correctPassword = false;
    this.info.foundUser = false;
    this.info.lastName = '';
    this.info.logged = false;
    this.info.name = '';
    this.info.user = '';
    this.showName = false;
    this.router.navigate(['/login']);
  }
}
