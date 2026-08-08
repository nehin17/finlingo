package com.finlingo.backend.Watchlist;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface WatchlistRepository extends JpaRepository<Watchlist, Integer> {
    List<Watchlist> findByUserId(UUID userId);
    void deleteByUserIdAndCompanyTicker(UUID userId, String ticker);
}