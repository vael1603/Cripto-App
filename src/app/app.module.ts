import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { CriptoDashboardComponent } from './cripto-dashboard/cripto-dashboard.component';
import { BuyModalComponent } from './buy-modal/buy-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataWs } from './interfaces/DataWs';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cripto-dashboard', component: CriptoDashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: "full" },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CriptoDashboardComponent,
    BuyModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    RouterModule
  ],
  exports: [RouterModule],
  providers: [DataWs],
  bootstrap: [AppComponent]
})
export class AppModule { }
