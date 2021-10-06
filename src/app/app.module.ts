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
import { ChartConfig } from './interfaces/ChartConfig';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BasicMaths } from './functions/BasicMaths';
import { MatSelectModule } from '@angular/material/select';
import { LoadingComponent } from './loading/loading/loading.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cripto-dashboard', component: CriptoDashboardComponent },
  { path: 'login', component: LoginComponent },
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
    BuyModalComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    RouterModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [RouterModule],
  providers: [DataWs, ChartConfig, BasicMaths, HeaderComponent, LoginComponent, LoadingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
