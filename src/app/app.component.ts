import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService){
    if(sessionStorage.getItem('Logged') != 'true') {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.loginService.sendInfoObservable.subscribe( res => {
      if(sessionStorage.getItem('Logged') != 'true') {
        this.router.navigate(['/login']);
      }
    })
  }
}

