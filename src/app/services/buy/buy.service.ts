import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyService {


  backendApi = environment.backendApi;
  path: string;
  
  constructor(
    public http: HttpClient
  ) { }

  saveOrder(body) {
    this.path = this.backendApi;
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*')
    .set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

    return this.http.post<any>(`${this.path}/buy`, body, {headers});
  }
}
