package com.finlingo.backend.company;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {
    List<PriceHistory> findByCompanyTickerOrderByDateAsc(String ticker);
}