import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';
import { DataWs } from '../interfaces/DataWs';
import { ExchangeInfo } from '../interfaces/ExchangeInfo';
import { DashboardService } from '../services/dashboard/dashboard.service';

@Component({
  selector: 'app-cripto-dashboard',
  templateUrl: './cripto-dashboard.component.html',
  styleUrls: ['./cripto-dashboard.component.css']
})
export class CriptoDashboardComponent implements OnInit {


  public exchangeNameList = [];
  public maxVolumeExchangeList = [];
  public exchangeVolumeList = [];
  public exchangeObjectList = [];
  public allIconList = [];
  public exchangeIconList = [];

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
    private dialog: MatDialog,
    public dataWs: DataWs
  ) { }

  ngOnInit(): void {
    this.getCriptos();
  }

/*  public getCriptos() {
    this.dashboardService.getExchangesIcons(5).subscribe( data => {
      this.allIconList = data;
    })
    this.dashboardService.getExchanges().subscribe( data => {
      this.fiveCriptosWithMoreVolumen(data)
        .then(res => this.setCharts());
    });
  }
*/

  public getCriptos() {
    this.allIconList = this.dataWs.dataExchangeIcons;
    this.fiveCriptosWithMoreVolumen(this.dataWs.dataExchanges)
        .then(res => this.setCharts());
  }

  public async fiveCriptosWithMoreVolumen(list) {
    let max = 0;
    let volumeList = list.map(a => a.volume_1mth_usd);

    for(var i=0; i<3; i++) {
      // buscamos el vamor mas grande
      max = Math.max.apply(null, volumeList);
      // buscamos el idice del valor en el array
      let index = volumeList.indexOf(max);
      // guardamos el Icono de la cripto en un array
      let icon = this.allIconList[index];
      this.exchangeIconList.push(icon);
      // guardamos el objeto completo en un array de objetos´
      let exchangeObject = list[index];
      this.exchangeObjectList.push(exchangeObject);
      // guardamos el nombre de la cripto en un array de nombres´
      let nameExchange =  exchangeObject.name;
      this.exchangeNameList.push(nameExchange);
      // guardamos el precio de la cripto en un array de precios´
      let volumeExchange = exchangeObject.volume_1mth_usd;
      this.exchangeVolumeList.push(volumeExchange);
      // guardamos dicho valor en un array de volumenes
      let maxBillion = this.convertNumberToBillions(max);
      this.maxVolumeExchangeList.push(maxBillion);
      // eliminamos dicho valor del array original
      volumeList.splice(index,1);
    };

    return this.setCharts();
  }

  public setCharts(){
    this.polarAreaChartType = 'pie';
    this.polarAreaChartLabels = this.exchangeNameList;
    this.polarAreaChartData = this.maxVolumeExchangeList;
    this.showPolarChartVolume = true;
  
    this.barChartType = 'bar';
    this.barChartDataSets = [{data: this.exchangeVolumeList, label: this.exchangeNameList}];
    this.barChartLabels = this.exchangeNameList;
    this.showBarChartPrice = true;                
  };

  public convertNumberToBillions(num){
    let billion = num / 1000000000
    return billion;
  }


  name = 'carlos';
  animal = 'perro';
  
  openDialog(): void {
    const dialogRef = this.dialog.open(BuyModalComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}