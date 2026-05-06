import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
    private apiUrl = 'http://localhost:8080/api/transactions';

    constructor(private http: HttpClient) { }

    transfer(fromAccount: string, toAccount: string, amount: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/transfer`, { fromAccount, toAccount, amount });
    }

    deposit(account: string, amount: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/deposit?account=${account}`, { amount });
    }

    withdraw(account: string, amount: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/withdraw?account=${account}`, { amount });
    }

    getHistory(accountNumber: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${accountNumber}`);
    }

    getUserHistory(): Observable<any> {
        return this.http.get(`${this.apiUrl}/user`);
    }
}
