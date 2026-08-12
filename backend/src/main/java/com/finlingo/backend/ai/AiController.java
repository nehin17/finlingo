package com.finlingo.backend.ai;

import com.finlingo.backend.ai.dto.ChatRequest;
import com.finlingo.backend.company.Company;
import com.finlingo.backend.company.CompanyRepository;
import com.finlingo.backend.company.PriceHistory;
import com.finlingo.backend.company.PriceHistoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;
    private final CompanyRepository companyRepository;
    private final PriceHistoryRepository priceHistoryRepository;

    public AiController(
            AiService aiService,
            CompanyRepository companyRepository,
            PriceHistoryRepository priceHistoryRepository
    ) {
        this.aiService = aiService;
        this.companyRepository = companyRepository;
        this.priceHistoryRepository = priceHistoryRepository;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestBody ChatRequest request
    ) {
        
        String ticker = request.getTicker() != null
        ? request.getTicker().toUpperCase()
        : null;

        if (ticker == null && request.getMessage() != null) {
            String message = request.getMessage().toUpperCase();

            for (Company company : companyRepository.findAll()) {
                String companyTicker = company.getTicker().toUpperCase();
                String companyName = company.getName().toUpperCase();

                if (message.contains(companyTicker)
                        || message.contains(companyName)) {
                    ticker = companyTicker;
                    break;
                }
            }
        }

        if (ticker == null) {
            ticker = "UNKNOWN";
        }

        String context = "No specific data found in DB for " + ticker;

        try {
            Company company = companyRepository
                    .findByTicker(ticker)
                    .orElse(null);

            if (company != null) {

                List<PriceHistory> prices =
        priceHistoryRepository.findByCompanyTickerOrderByDateAsc(ticker);

                prices.sort(
                        Comparator.comparing(PriceHistory::getDate).reversed()
                );

                StringBuilder data = new StringBuilder();

                data.append("Company: ")
                        .append(company.getName())
                        .append("\n");

                data.append("Ticker: ")
                        .append(company.getTicker())
                        .append("\n");

                data.append("Sector: ")
                        .append(company.getSector())
                        .append("\n");

                data.append("Exchange: ")
                        .append(company.getExchange())
                        .append("\n");

                data.append("Market Capitalization: ")
                        .append(company.getMarketCapitalization())
                        .append("\n");

                data.append("P/E Ratio: ")
                        .append(company.getPeRatio())
                        .append("\n");

                data.append("Revenue Growth: ")
                        .append(company.getRevenueGrowth())
                        .append("\n");

                if (!prices.isEmpty()) {

                    PriceHistory latest = prices.get(0);

                    data.append("\nLatest Market Data:\n");

                    data.append("Date: ")
                            .append(latest.getDate())
                            .append("\n");

                    data.append("Current Price: ")
                            .append(latest.getClose())
                            .append("\n");

                    data.append("Open: ")
                            .append(latest.getOpen())
                            .append("\n");

                    data.append("High: ")
                            .append(latest.getHigh())
                            .append("\n");

                    data.append("Low: ")
                            .append(latest.getLow())
                            .append("\n");

                    data.append("Volume: ")
                            .append(latest.getVolume())
                            .append("\n");

                    data.append("Data Source: ")
                            .append(latest.getSource())
                            .append("\n");

                    data.append("\nRecent Price History:\n");

                    prices.stream()
                            .limit(10)
                            .forEach(price ->
                                    data.append(price.getDate())
                                            .append(": ")
                                            .append(price.getClose())
                                            .append("\n")
                            );
                }

                context = data.toString();
            }

        } catch (Exception e) {
            System.out.println(
                    "Could not fetch company data: "
                            + e.getMessage()
            );
        }

        String answer = aiService.generateAnswer(
                ticker,
                request.getMessage(),
                context
        );

        return ResponseEntity.ok(
                Map.of("response", answer)
        );
    }
}