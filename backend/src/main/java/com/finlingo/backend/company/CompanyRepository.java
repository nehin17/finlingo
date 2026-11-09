package com.finlingo.backend.company;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, String> {
    Optional<Company> findByTickerIgnoreCase(String ticker);
    java.util.Optional<com.finlingo.backend.company.Company> findByTicker(String ticker);
}