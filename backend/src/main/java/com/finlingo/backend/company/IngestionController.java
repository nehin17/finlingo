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
    @PostMapping("/all")
    public String ingestAllCompanies() {

        String[] tickers = {
                "AAPL", "AMD", "AMZN", "BA", "COST",
                "CVX", "GOOGL", "INTC", "JNJ", "JPM",
                "MA", "META", "MSFT", "NVDA", "TSLA",
                "UNH", "V", "WMT", "XOM"
        };

        for (String ticker : tickers) {
            try {
                ingestionService.ingestCompany(ticker);
                System.out.println("Successfully ingested: " + ticker);
            } catch (Exception e) {
                System.err.println(
                        "Failed to ingest " + ticker + ": " + e.getMessage()
                );
            }
        }

        return "Finished ingesting all companies.";
    }
}