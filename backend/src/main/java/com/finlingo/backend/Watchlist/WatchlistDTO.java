package com.finlingo.backend.Watchlist;

import java.time.LocalDateTime;

public class WatchlistDTO {

    private String ticker;
    private String name;
    private LocalDateTime addedAt;

    public WatchlistDTO(
            String ticker,
            String name,
            LocalDateTime addedAt
    ) {
        this.ticker = ticker;
        this.name = name;
        this.addedAt = addedAt;
    }

    public String getTicker() {
        return ticker;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }
}