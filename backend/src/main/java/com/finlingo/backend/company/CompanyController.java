package com.finlingo.backend.company;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyRepository companyRepository;
    private final CompanyResearchService companyResearchService;

    public CompanyController(
            CompanyRepository companyRepository,
            CompanyResearchService companyResearchService
    ) {
        this.companyRepository = companyRepository;
        this.companyResearchService = companyResearchService;
    }

    @GetMapping
    public List<Company> getAll() {
        return companyRepository.findAll();
    }

    @GetMapping("/{ticker}")
    public CompanyResearchDTO getOne(
            @PathVariable String ticker
    ) {
        return companyResearchService.getCompanyResearch(ticker);
    }
}