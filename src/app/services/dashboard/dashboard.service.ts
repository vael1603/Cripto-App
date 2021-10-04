import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  path: string;

  constructor(
    private http: HttpClient
  ) { }

  coinApi = environment.coinApi;
  coinApikey = environment.coinApiKey;

  getCriptoAssets() {
    this.path = this.coinApi;
    const headers = new HttpHeaders()
    .set('X-CoinAPI-Key', this.coinApikey);

    return this.http.get<any>(`${this.path}/assets`, {headers});
  }

  getCriptoInfo(criptoId) {
    this.path = this.coinApi;
    const headers = new HttpHeaders()
    .set('X-CoinAPI-Key', this.coinApikey);

    return this.http.get<any>(`${this.path}/assets/${criptoId}`, {headers});
  }

  getCriptosIcons(size) {
    this.path = this.coinApi;
    const headers = new HttpHeaders()
    .set('X-CoinAPI-Key', this.coinApikey);

    return this.http.get<any>(`${this.path}/assets/icons/${size}`, {headers});
  }

  getExchanges() {
    this.path = this.coinApi;
    const headers = new HttpHeaders()
    .set('X-CoinAPI-Key', this.coinApikey);

    return this.http.get<any>(`${this.path}/exchanges`, {headers});
  }

  getExchangesIcons(size) {
    this.path = this.coinApi;
    const headers = new HttpHeaders()
    .set('X-CoinAPI-Key', this.coinApikey);

    return this.http.get<any>(`${this.path}/exchanges/icons/${size}`, {headers});
  }

  getExchangeRate(assetBase,assetQuote){
    this.path = this.coinApi;
    const headers = new HttpHeaders()
    .set('X-CoinAPI-Key', this.coinApikey);
    const timeNow = new Date().toISOString().slice(0, 10);
    return this.http.get<any>(`${this.path}/exchangerate/${assetBase}/${assetQuote}?time=${timeNow}`, {headers});
  }
}

