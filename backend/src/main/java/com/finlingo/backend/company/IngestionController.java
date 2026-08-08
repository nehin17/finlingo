package com.finlingo.backend.company;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ingest")
public class IngestionController {

    private final FinnhubIngestionService ingestionService;

    public IngestionController(FinnhubIngestionService ingestionService) {
        this.ingestionService = ingestionService;
    }

    @PostMapping("/{ticker}")
    public Company ingestCompanyData(@PathVariable String ticker) {
        return ingestionService.ingestCompany(ticker);
    }
}