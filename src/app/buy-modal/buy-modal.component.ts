import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyService } from '../services/buy/buy.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {

name: string;

  constructor(
    private snackbar: MatSnackBar,
    private dialogRef: MatDialog,
    private buyService: BuyService,
    @Inject(MAT_DIALOG_DATA) public data: {
      criptoName: string
      pricePerUnit: number,
      price: number,
      commission: number, 
      total: number,
      commissionValue: number,
      quantity: number}
    ) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('Name');
  }

  saveOrder() {
    let data = {
      asset: this.data.criptoName,
      quantity: this.data.quantity,
      payed: this.data.total,
      commission: this.data.commissionValue,
      user: this.name
    };
    this.buyService.saveOrder(data).subscribe( data => {
      this.dialogRef.closeAll();
      this.snackbar.open(data.info, 'CriptoInfo.com', {
        duration: 3000,
        verticalPosition: 'bottom'
      });

    });
  }
}
