package com.finlingo.backend.Watchlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WatchlistRepository
        extends JpaRepository<Watchlist, Integer> {

    List<Watchlist> findByUserId(UUID userId);

    Optional<Watchlist> findByUserIdAndCompanyTicker(
            UUID userId,
            String ticker
    );

    void deleteByUserIdAndCompanyTicker(
            UUID userId,
            String ticker
    );
}