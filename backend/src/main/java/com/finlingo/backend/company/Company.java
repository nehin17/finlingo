package com.finlingo.backend.company;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Company {

    @Id
    private String ticker;

    private String name;
    private String sector;
    private String description;

    // Getters and setters
    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}