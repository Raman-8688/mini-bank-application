import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private apiUrl = 'http://localhost:8080/api/accounts';

    constructor(private http: HttpClient) { }

    getAccountDetails(accountNumber: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${accountNumber}`);
    }

    getBalance(accountNumber: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/balance/${accountNumber}`);
    }

    createAccount(userId: number, accountNumber: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/create?userId=${userId}&accountNumber=${accountNumber}`, {});
    }

    getMyAccounts(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/user/${userId}`);
    }
}
