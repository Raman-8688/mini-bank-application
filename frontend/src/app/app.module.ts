import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/features/auth/login/login.component';
import { DashboardComponent } from 'src/app/features/dashboard/dashboard.component';
import { TransferComponent } from 'src/app/features/transactions/transfer.component';
import { DepositComponent } from 'src/app/features/transactions/deposit.component';
import { WithdrawComponent } from 'src/app/features/transactions/withdraw.component';
import { HistoryComponent } from 'src/app/features/transactions/history.component';
import { CreateAccountComponent } from 'src/app/features/account/create-account.component';

import { JwtInterceptor } from 'src/app/core/interceptors/jwt.interceptor';
import { RegisterComponent } from './features/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TransferComponent,
    DepositComponent,
    WithdrawComponent,
    HistoryComponent,
    CreateAccountComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
