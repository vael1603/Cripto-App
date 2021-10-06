import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { LoginResponse, UserPassword } from '../interfaces/UserPassword';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  username: any;
  password: any;
  incorrectPassword = false;
  notFoundUser = false;
  loginInfo: LoginResponse;
  constructor(private loginService: LoginService,
    private router: Router) {
    
  }

  ngOnInit(): void {
  }
  
  public login() {
    this.resetErrors();
    this.loginService.login(this.form).subscribe( data =>{
      this.refreshInfo(data)
      if (data.logged == true){
        sessionStorage.setItem('Logged', 'true');
        sessionStorage.setItem('Name', data.lastName + ' ' + data.name);
        this.router.navigate(['/dashboard']);
      } else {
        if (data.foundUser == true) {
          this.incorrectPassword = true;
        } else {
          this.notFoundUser = true;
        }
      }
    });
  }

  refreshInfo(info: LoginResponse) {
    this.loginService.sendInfo(info);
  }


  resetErrors() {
    this.notFoundUser = false;
    this.incorrectPassword = false;
  }

}
