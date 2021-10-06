import { ApplicationRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  dialogRef: any;

  constructor(
    private cdr: ApplicationRef,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }


  openDialog(): void {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      width: 'auto',
      disableClose: true
    });

    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  showSpiner() {
    this.openDialog();
  }
  stopSpiner() {
    this.dialogRef.close();
    this.cdr.tick();
  }

}
