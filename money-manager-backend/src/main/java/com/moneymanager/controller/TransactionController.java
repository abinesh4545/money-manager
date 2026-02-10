package com.moneymanager.controller;

import com.moneymanager.model.Transaction;
import com.moneymanager.service.TransactionService;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "https://moneymanager-14.netlify.app/")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    // ✅ Add income / expense
    @PostMapping
    public Transaction add(@RequestBody Transaction transaction) {
        return service.addTransaction(transaction);
    }
    
 // ✅ Update transaction
    @PutMapping("/{id}")
    public Transaction update(
            @PathVariable String id,
            @RequestBody Transaction transaction) {
        return service.updateTransaction(id, transaction);
    }


    // ✅ Get all
    @GetMapping
    public List<Transaction> getAll() {
        return service.getAllTransactions();
    }

    // ✅ Filter by date range
    @GetMapping("/filter")
    public List<Transaction> filter(
        @RequestParam
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        LocalDateTime start,

        @RequestParam
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        LocalDateTime end
    ) {
        return service.getByDateRange(start, end);
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteTransaction(id);
    }
}
