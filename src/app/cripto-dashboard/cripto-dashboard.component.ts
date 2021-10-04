import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';
import { BasicMaths } from '../functions/BasicMaths';
import { ChartConfig } from '../interfaces/ChartConfig';
import { DataWs } from '../interfaces/DataWs';
import { DashboardService } from '../services/dashboard/dashboard.service';

@Component({
  selector: 'app-cripto-dashboard',
  templateUrl: './cripto-dashboard.component.html',
  styleUrls: ['./cripto-dashboard.component.css']
})
export class CriptoDashboardComponent implements OnInit {


  public exchangeNameList = [];
  public maxVolumeExchangeList = [];
  public exchangeObjectList = [];
  public allIconList = [];
  public exchangeIconList = [];

  polarAreaChartLabels: Label[];
  polarAreaChartData: SingleDataSet;
  polarAreaLegend = true;
  polarAreaChartType: ChartType;
  showPolarChartVolume = false;

  criptoName: any;
  iconUrl: any;
  criptoObject: any;

  showPrice = false;
  quantity: number;
  pricePerUnity: number;
  price: number;

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    public basicMaths: BasicMaths,
    public dataWs: DataWs,
    public route: ActivatedRoute,
    public chartConfig: ChartConfig
  ) {
    this.route.queryParams.subscribe(params => {
      this.criptoName = params['criptoName'];
      this.iconUrl = params['iconUrl'];
    });
  }

  ngOnInit(): void {
    this.dashboardService.getExchangeRate(this.criptoName, 'USD').subscribe( data => {
      this.pricePerUnity = data.rate;
      this.getExchanges();
    });
  }

  public getExchanges() {
    this.dashboardService.getExchangesIcons(9999).subscribe( data => {
      this.allIconList = data;
      this.dashboardService.getExchanges().subscribe( data => {
        this.fiveExchangesWithMoreVolumen(data)
          .then(res => this.setCharts());
      });
    })
  }
/*
  public getCriptos() {
    this.allIconList = this.dataWs.dataExchangeIcons;
    this.fiveCriptosWithMoreVolumen(this.dataWs.dataExchanges)
        .then(res => this.setCharts());
    this.criptoObject = this.dashboardService.getCriptoInfo(this.criptoName)
  }*/

  public async fiveExchangesWithMoreVolumen(list) {
    let max = 0;
    let volumeList = list.map(a => a.volume_1mth_usd);
    let urlIconList = this.allIconList.map(a => a.exchange_id);
    let i = -1;
    console.log(this.exchangeObjectList.length);
    while(this.exchangeObjectList.length < 3 ) {

      // buscamos el vamor mas grande
      max = Math.max.apply(null, volumeList);
      let index = volumeList.indexOf(max);
      let exchangeObject = list[index];
      let iconIndex = urlIconList.indexOf(exchangeObject.exchange_id);
      let maxBillion = this.basicMaths.convertNumberToBillions(max);
      if (iconIndex != -1) {
        i = i + 1;
        this.exchangeObjectList.push(exchangeObject);
        // guardamos el Icono de la cripto en un array
          this.exchangeObjectList[i].url= this.allIconList[iconIndex].url;
          console.log(this.exchangeObjectList[i]);
        // guardamos dicho valor en un array de volumenes
        this.maxVolumeExchangeList.push(maxBillion);
        switch(i) { 
          case 0: { 
            this.exchangeObjectList[i].commission = 0.25;
            break; 
          } 
          case 1: { 
            this.exchangeObjectList[i].commission = 0.4;
            break; 
          } 
          case 2: { 
            this.exchangeObjectList[i].commission = 0.55;
            break; 
          } 
        } 
      }
      volumeList.splice(index,1);
    };
    return this.setCharts();
  }

  public setCharts(){
    this.polarAreaChartType = 'pie';
    this.polarAreaChartLabels = this.exchangeNameList;
    this.polarAreaChartData = this.maxVolumeExchangeList;
    this.showPolarChartVolume = true;           
  };

  public getPrice() {
    let res = this.quantity * this.pricePerUnity;
    this.price = this.basicMaths.valueFormat(res,2);
    if (this.price > 0){
      this.showPrice = true;
    } else {
      this.showPrice = false;
    }
  }

  openDialog(commissionPrice): void {
    const dialogRef = this.dialog.open(BuyModalComponent, {
      width: '250px',
      data: {criptoName: this.criptoName, pricePerUnit: this.pricePerUnity, price: this.price, commission: commissionPrice }
    });

    dialogRef.afterClosed().subscribe(result => {
    }); 
  }
}