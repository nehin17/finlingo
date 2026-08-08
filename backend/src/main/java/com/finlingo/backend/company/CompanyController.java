package com.finlingo.backend.company;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public List<Company> getAll() {
        return companyRepository.findAll();
    }

    @GetMapping("/{ticker}")
    public Company getOne(@PathVariable String ticker) {
        return companyRepository.findByTickerIgnoreCase(ticker)
                .orElseThrow(() -> new RuntimeException("Company not found with ticker: " + ticker));
    }
}