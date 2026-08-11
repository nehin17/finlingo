package com.finlingo.backend.company;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class CompanyResearchService {

    private final CompanyRepository companyRepository;
    private final PriceHistoryRepository priceHistoryRepository;

    public CompanyResearchService(
            CompanyRepository companyRepository,
            PriceHistoryRepository priceHistoryRepository
    ) {
        this.companyRepository = companyRepository;
        this.priceHistoryRepository = priceHistoryRepository;
    }

    public CompanyResearchDTO getCompanyResearch(String ticker) {

        String symbol = ticker.toUpperCase();

        Company company = companyRepository
                .findByTickerIgnoreCase(symbol)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company not found with ticker: " + symbol
                        )
                );

        List<PriceHistory> history =
                priceHistoryRepository
                        .findByCompanyTickerOrderByDateAsc(symbol);

        BigDecimal price = null;
        BigDecimal change = BigDecimal.ZERO;
        boolean positive = true;

        BigDecimal open = null;
        BigDecimal high = null;
        BigDecimal low = null;
        Long volume = null;

        List<CompanyResearchDTO.PricePointDTO> chartData =
                history.stream()
                        .map(item ->
                                new CompanyResearchDTO.PricePointDTO(
                                        item.getDate().toString(),
                                        item.getClose()
                                )
                        )
                        .toList();

        // ---------------------------------------------
        // Latest price
        // ---------------------------------------------

        if (!history.isEmpty()) {

            PriceHistory latest =
                    history.get(history.size() - 1);

            price = latest.getClose();
            open = latest.getOpen();
            high = latest.getHigh();
            low = latest.getLow();
            volume = latest.getVolume();

            // -----------------------------------------
            // Calculate % change from previous close
            // -----------------------------------------

            if (history.size() >= 2) {

                PriceHistory previous =
                        history.get(history.size() - 2);

                BigDecimal previousClose =
                        previous.getClose();

                if (price != null
                        && previousClose != null
                        && previousClose.compareTo(
                                BigDecimal.ZERO
                        ) != 0) {

                    change = price
                            .subtract(previousClose)
                            .divide(
                                    previousClose,
                                    6,
                                    RoundingMode.HALF_UP
                            )
                            .multiply(
                                    BigDecimal.valueOf(100)
                            )
                            .setScale(
                                    2,
                                    RoundingMode.HALF_UP
                            );

                    positive =
                            change.compareTo(
                                    BigDecimal.ZERO
                            ) >= 0;
                }
            }
        }

        // ---------------------------------------------
        // Build frontend-ready DTO
        // ---------------------------------------------

        return new CompanyResearchDTO(
                company.getTicker(),
                company.getName(),
                company.getSector(),
                company.getDescription(),
                company.getExchange(),
                company.getCountry(),

                // market
                company.getExchange(),

                price,
                change,
                positive,

                company.getMarketCapitalization(),
                company.getPeRatio(),
                company.getRevenueGrowth(),

                open,
                high,
                low,
                volume,

                chartData
        );
    }
}