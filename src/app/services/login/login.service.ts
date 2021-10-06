import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { LoginResponse } from 'src/app/interfaces/UserPassword';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) {}
  
  backendApi = environment.backendApi;
  path: string;

  infoLogin: LoginResponse;
  private sendInfoLoginSubject = new Subject<LoginResponse>();
  sendInfoObservable = this.sendInfoLoginSubject.asObservable();

  sendInfo(info: LoginResponse) {
    this.infoLogin = info;
    this.sendInfoLoginSubject.next(info);
  }



  login(body) {
    this.path = this.backendApi;

    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*')
    .set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')

    return this.http.post<any>(`${this.path}/login`, body, {headers});
  }
}
