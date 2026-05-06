package com.minibank.repository;

import com.minibank.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByFromAccountOrToAccountOrderByTimestampDesc(String fromAccount, String toAccount);

    @Query("SELECT t FROM Transaction t WHERE t.fromAccount IN (SELECT a.accountNumber FROM Account a WHERE a.user.username = :username) OR t.toAccount IN (SELECT a.accountNumber FROM Account a WHERE a.user.username = :username) ORDER BY t.timestamp DESC")
    List<Transaction> findAllTransactionsByUsername(@Param("username") String username);
}
