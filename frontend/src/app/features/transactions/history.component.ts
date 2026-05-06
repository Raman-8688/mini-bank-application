import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    transactions: any[] = [];
    loading: boolean = true;

    constructor(private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.transactionService.getUserHistory().subscribe({
            next: (data: any[]) => {
                this.transactions = data;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }
}
