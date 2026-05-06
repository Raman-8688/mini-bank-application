import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    user: User | null;
    accounts: any[] = [];
    isAdmin: boolean = false;

    constructor(public authService: AuthService, private accountService: AccountService) {
        this.user = this.authService.currentUserValue;
        this.isAdmin = this.authService.hasRole('ROLE_ADMIN');
    }

    ngOnInit(): void {
        if (this.user) {
            if (!this.isAdmin) {
                this.accountService.getMyAccounts(this.user.id).subscribe((data: any[]) => {
                    this.accounts = data;
                });
            }
        }
    }
}
