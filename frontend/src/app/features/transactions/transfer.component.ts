import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService, User } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
    transferForm!: FormGroup;
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
        this.transferForm = this.fb.group({
            fromAccount: ['', Validators.required],
            toAccount: ['', Validators.required],
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
        if (this.transferForm.invalid) return;
        this.loading = true;
        this.success = '';
        this.error = '';

        const val = this.transferForm.value;
        this.transactionService.transfer(val.fromAccount as string, val.toAccount as string, val.amount as number).subscribe({
            next: () => {
                this.success = 'Transfer successful!';
                this.loading = false;
                this.transferForm.reset();
            },
            error: (err: any) => {
                this.error = err.error?.message || 'Transfer failed';
                this.loading = false;
            }
        });
    }
}
