import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService, User } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-deposit',
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
    depositForm!: FormGroup;
    accounts: any[] = [];
    loading: boolean = false;
    success: string = '';
    error: string = '';

    constructor(
        private fb: FormBuilder,
        private transactionService: TransactionService,
        private accountService: AccountService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.depositForm = this.fb.group({
            account: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(0.01)]]
        });

        const user: User | null = this.authService.currentUserValue;
        if (user) {
            this.accountService.getMyAccounts(user.id).subscribe((data: any[]) => {
                this.accounts = data;
            });
        }
    }

    onSubmit(): void {
        if (this.depositForm.invalid) return;
        this.loading = true;
        this.success = '';
        this.error = '';

        const val = this.depositForm.value;
        this.transactionService.deposit(val.account, val.amount).subscribe({
            next: () => {
                this.success = 'Deposit successful!';
                this.loading = false;
                this.depositForm.reset();
            },
            error: (err: any) => {
                this.error = err.error?.message || 'Deposit failed';
                this.loading = false;
            }
        });
    }
}
