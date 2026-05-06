package com.minibank.controller;

import com.minibank.dto.DepositRequest;
import com.minibank.dto.TransferRequest;
import com.minibank.entity.Transaction;
import com.minibank.security.CustomUserDetails;
import com.minibank.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transfer")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Transaction> transfer(@RequestBody TransferRequest transferRequest) {
        return ResponseEntity.ok(transactionService.transfer(
                transferRequest.getFromAccount(), transferRequest.getToAccount(), transferRequest.getAmount()));
    }

    @PostMapping("/deposit")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Transaction> deposit(@RequestParam String account, @RequestBody DepositRequest request) {
        return ResponseEntity.ok(transactionService.deposit(account, request.getAmount()));
    }

    @PostMapping("/withdraw")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Transaction> withdraw(@RequestParam String account, @RequestBody DepositRequest request) {
        return ResponseEntity.ok(transactionService.withdraw(account, request.getAmount()));
    }

    @GetMapping("/{accountNumber}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Transaction>> getHistory(@PathVariable String accountNumber) {
        return ResponseEntity.ok(transactionService.getTransactionHistory(accountNumber));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Transaction>> getUserHistory(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(transactionService.getUserTransactions(userDetails.getUsername()));
    }
}
