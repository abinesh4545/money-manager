package com.moneymanager.model;


import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.NonNull;

import java.time.LocalDateTime;

@Data
@Document(collection = "transactions")
public class Transaction {

	   @Id
	    private String id;

	    @NotNull(message = "Type is required")
	    private String type;

	    @Positive(message = "Amount must be greater than 0")
	    private double amount;

	    @NotNull(message = "Category is required")
	    private String category;
	    
	    @NotNull(message = "Division is required")
	    private Division division;

	    private String description;

	    private LocalDateTime createdAt = LocalDateTime.now();

    public Division getDivision() {
			return division;
		}
		public void setDivision(Division division) {
			this.division = division;
		}
	public String getId() { return id; }
    public String getType() { return type; }
    public double getAmount() { return amount; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(String id) { this.id = id; }
    public void setType(String type) { this.type = type; }
    public void setAmount(double amount) { this.amount = amount; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}