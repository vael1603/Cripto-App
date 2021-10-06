import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { CriptoInfo } from '../interfaces/CriptoInfo';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { DataWs } from '../interfaces/DataWs';
import { ChartConfig } from '../interfaces/ChartConfig';
import { BasicMaths } from '../functions/BasicMaths';
import { Router, Routes } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { LoadingComponent } from '../loading/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public criptoNameList = [];
  public maxVolumeCriptoList = [];
  public criptoPriceList = [];
  public criptoObjectList = [];
  public allIconList = [];
  public criptoIconList = [];

  polarAreaChartLabels: Label[];
  polarAreaChartData: SingleDataSet;
  polarAreaLegend = true;
  polarAreaChartType: ChartType;
  showPolarChartVolume = false;

  constructor(
    private loginService: LoginService,
    private dashboardService: DashboardService,
    public dataWs: DataWs,
    public chartConfig: ChartConfig,
    public basicMaths: BasicMaths,
    private router: Router,
    private loading: LoadingComponent,
  ) {
  }

  ngOnInit(): void {
    this.loading.showSpiner();
    this.getCriptos();
  }

  public getCriptos() {
    this.dashboardService.getCriptosIcons(9999).subscribe( data => {
      this.allIconList = data;
      this.dashboardService.getCriptoAssets().subscribe( dat => {
        this.fiveCriptosWithMoreVolumen(dat)
          .then(res => this.setCharts());
      });
    });
  }

/*
  public getCriptos() {
    this.allIconList = this.dataWs.dataCriptoIcons;
    console.log(this.allIconList);
    this.fiveCriptosWithMoreVolumen(this.dataWs.dataAssets)
        .then(res => this.setCharts());
  }*/

  public async fiveCriptosWithMoreVolumen(list) {
    let max = 0;
    let volumeList = list.map(a => a.volume_1mth_usd);
    let urlIconList = this.allIconList.map(a => a.asset_id);
    let i = -1;

    while(this.criptoObjectList.length < 5){
        // buscamos el vamor mas grande
      max = Math.max.apply(null, volumeList);
      // buscamos el idice del valor en el array
      let index = volumeList.indexOf(max);
      // guardamos el objeto completo en un array de objetos´
      let criptoObject = list[index];
      if(criptoObject.price_usd >0) {
        i= i + 1;
        this.criptoObjectList.push(criptoObject);
        // guardamos el nombre de la cripto en un array de nombres´
        let nameCripto =  criptoObject.name;
        this.criptoNameList.push(nameCripto);
        // guardamos el Icono de la cripto en un array
        let iconIndex = urlIconList.indexOf(criptoObject.asset_id);
        if (iconIndex == -1) {
          let icon = {asset_id: criptoObject.asset_id, url: this.dataWs.notFoundIMG};
          this.criptoIconList.push(icon);
        } else {
        let icon = this.allIconList[iconIndex];
        this.criptoIconList.push(icon);
        }
        // guardamos el precio de la cripto en un array de precios´
        let priceCripto = this.basicMaths.valueFormat(criptoObject.price_usd, 3);
        this.criptoObjectList[i].price_usd = priceCripto;
        // guardamos dicho valor en un array de volumenes
        let maxBillion = this.basicMaths.convertNumberToBillions(max);
        this.maxVolumeCriptoList.push(maxBillion); 
      }
      // eliminamos dicho valor del array original
      volumeList.splice(index,1);
    };
  }

  public setCharts(){
    this.polarAreaChartType = 'pie';
    this.polarAreaChartLabels = this.criptoNameList;
    this.polarAreaChartData = this.maxVolumeCriptoList;
    this.showPolarChartVolume = true;
    this.loading.stopSpiner();
  };

}
