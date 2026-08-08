package com.finlingo.backend.company;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @Column(length = 10)
    private String ticker;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 50)
    private String sector;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 20)
    private String exchange;

    @Column(length = 50)
    private String country = "US";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void setLastUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker != null ? ticker.toUpperCase() : null; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getExchange() { return exchange; }
    public void setExchange(String exchange) { this.exchange = exchange; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}