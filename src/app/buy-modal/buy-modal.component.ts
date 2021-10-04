import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      criptoName: string, pricePerUnit: number, price: number, commission: number}
    ) { }

  ngOnInit(): void {
    this.getTotalPrice();
  }

  total: number;
  commissionValue: number;

  getTotalPrice() {
    let res = this.data.price * this.data.commission;
    this.commissionValue = res/100;
    this.total = this.commissionValue + this.data.price;
  }

}
