import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
    loading: boolean = false;
    error: string = '';

    constructor(private accountService: AccountService, private router: Router) { }

    createAccount(): void {
        this.loading = true;
        this.accountService.createAccount(0, "").subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/dashboard']);
            },
            error: (err: any) => {
                this.error = 'Failed to create account.';
                this.loading = false;
            }
        });
    }
}
