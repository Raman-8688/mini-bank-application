package com.minibank.service;

import com.minibank.dto.AccountDto;
import com.minibank.entity.Account;
import com.minibank.entity.User;
import com.minibank.exception.BadRequestException;
import com.minibank.exception.ResourceNotFoundException;
import com.minibank.repository.AccountRepository;
import com.minibank.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountService(AccountRepository accountRepository, UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public AccountDto createAccount(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String accountNumber;
        do {
            accountNumber = "ACC-X" + (long) (Math.random() * 10000000000L);
        } while (accountRepository.existsByAccountNumber(accountNumber));

        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setUser(user);
        account.setBalance(BigDecimal.ZERO);

        Account savedAccount = accountRepository.save(account);
        return mapToDto(savedAccount);
    }

    public AccountDto getAccountDetails(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        return mapToDto(account);
    }

    public BigDecimal getBalance(String accountNumber) {
        return getAccountDetails(accountNumber).getBalance();
    }

    public List<AccountDto> getAccountsForUser(Long userId) {
        return accountRepository.findByUserId(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<AccountDto> getAccountsForUsername(String username) {
        return accountRepository.findByUserUsername(username).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private AccountDto mapToDto(Account account) {
        return new AccountDto(account.getId(), account.getAccountNumber(), account.getBalance(), account.getUser().getUsername());
    }
}
