package com.moneymanager.service;

import com.moneymanager.model.Transaction;
import com.moneymanager.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public Transaction addTransaction(Transaction transaction) {
        return repository.save(transaction);
    }
    public Transaction updateTransaction(String id, Transaction updated) {
        Transaction existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        existing.setType(updated.getType());
        existing.setAmount(updated.getAmount());
        existing.setCategory(updated.getCategory());
        existing.setDescription(updated.getDescription());
        existing.setCreatedAt(updated.getCreatedAt());
        existing.setDivision(updated.getDivision());

        return repository.save(existing);
    }


    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    public List<Transaction> getByDateRange(LocalDateTime start, LocalDateTime end) {
        return repository.findByCreatedAtBetween(start, end);
    }

    public void deleteTransaction(String id) {
        repository.deleteById(id);
    }
}
