import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { CriptoInfo } from '../interfaces/CriptoInfo';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { DataWs } from '../interfaces/DataWs';

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

  barChartType = 'horizontalBar';
  barChartDataSets = [];
  barChartLabels = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLegend = true;
  showBarChartPrice = false;

  barChartColors = [{
    backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 2,
  }];

  constructor(
    private dashboardService: DashboardService,
    public dataWs: DataWs
  ) { }

  ngOnInit(): void {
    this.getCriptos();
  }
/*
  public getCriptos() {
    this.dashboardService.getCriptosIcons(5).subscribe( data => {
      this.allIconList = data;
    });
    this.dashboardService.getCriptoAssets().subscribe( data => {
      this.fiveCriptosWithMoreVolumen(data)
        .then(res => this.setCharts());
    });
  }
*/

  public getCriptos() {
    this.allIconList = this.dataWs.dataCriptoIcons;
    console.log(this.allIconList);
    this.fiveCriptosWithMoreVolumen(this.dataWs.dataAssets)
        .then(res => this.setCharts());
  }

  public async fiveCriptosWithMoreVolumen(list) {
    let max = 0;
    let volumeList = list.map(a => a.volume_1mth_usd);

    for(var i=0; i<5; i++) {
      // buscamos el vamor mas grande
      max = Math.max.apply(null, volumeList);
      // buscamos el idice del valor en el array
      let index = volumeList.indexOf(max);
      // guardamos el Icono de la cripto en un array
      let icon = this.allIconList[index];
      this.criptoIconList.push(icon);
      // guardamos el objeto completo en un array de objetos´
      let criptoObject = list[index];
      this.criptoObjectList.push(criptoObject);
      // guardamos el nombre de la cripto en un array de nombres´
      let nameCripto =  criptoObject.name;
      this.criptoNameList.push(nameCripto);
      // guardamos el precio de la cripto en un array de precios´
      let priceCripto = criptoObject.price_usd;
      this.criptoPriceList.push(priceCripto);
      // guardamos dicho valor en un array de volumenes
      let maxBillion = this.convertNumberToBillions(max);
      this.maxVolumeCriptoList.push(maxBillion);
      // eliminamos dicho valor del array original
      volumeList.splice(index,1);
    };
  }

  public setCharts(){
    this.polarAreaChartType = 'pie';
    this.polarAreaChartLabels = this.criptoNameList;
    this.polarAreaChartData = this.maxVolumeCriptoList;
    this.showPolarChartVolume = true;
  
    this.barChartType = 'bar';
    this.barChartDataSets = [{data: this.criptoPriceList, label: this.criptoNameList}];
    this.barChartLabels = this.criptoNameList;
    this.showBarChartPrice = true;                
  };

  public convertNumberToBillions(num){
    let billion = num / 1000000000
    return billion;
  }
}
