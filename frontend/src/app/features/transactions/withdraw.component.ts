import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService, User } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
    withdrawForm!: FormGroup;
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
        this.withdrawForm = this.fb.group({
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
        if (this.withdrawForm.invalid) return;
        this.loading = true;
        this.success = '';
        this.error = '';

        const val = this.withdrawForm.value;
        this.transactionService.withdraw(val.account, val.amount).subscribe({
            next: () => {
                this.success = 'Withdrawal successful!';
                this.loading = false;
                this.withdrawForm.reset();
            },
            error: (err: any) => {
                this.error = err.error?.message || 'Withdrawal failed';
                this.loading = false;
            }
        });
    }
}
