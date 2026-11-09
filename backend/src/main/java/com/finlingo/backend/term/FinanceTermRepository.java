package com.finlingo.backend.term;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FinanceTermRepository extends JpaRepository<FinanceTerm, Integer> {
    Optional<FinanceTerm> findByTermIgnoreCase(String term);
}