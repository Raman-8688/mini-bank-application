import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/features/auth/login/login.component';
import { DashboardComponent } from 'src/app/features/dashboard/dashboard.component';
import { TransferComponent } from 'src/app/features/transactions/transfer.component';
import { DepositComponent } from 'src/app/features/transactions/deposit.component';
import { WithdrawComponent } from 'src/app/features/transactions/withdraw.component';
import { HistoryComponent } from 'src/app/features/transactions/history.component';
import { CreateAccountComponent } from 'src/app/features/account/create-account.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-account', component: CreateAccountComponent, canActivate: [AuthGuard] },
  { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard] },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
