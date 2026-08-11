package com.finlingo.backend.company;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

@Service
public class FinnhubIngestionService {

    @Value("${finnhub.api.key}")
    private String apiKey;

    @Value("${finnhub.api.base-url:https://finnhub.io/api/v1}")
    private String baseUrl;

    private final CompanyRepository companyRepository;
    private final PriceHistoryRepository priceHistoryRepository;
    private final NewsItemRepository newsItemRepository;
    private final RestClient restClient;

    public FinnhubIngestionService(CompanyRepository companyRepository,
                                   PriceHistoryRepository priceHistoryRepository,
                                   NewsItemRepository newsItemRepository) {
        this.companyRepository = companyRepository;
        this.priceHistoryRepository = priceHistoryRepository;
        this.newsItemRepository = newsItemRepository;
        this.restClient = RestClient.create();
    }

    public Company ingestCompany(String ticker) {
        String symbol = ticker.toUpperCase();

        // 1. Fetch & Save Company Profile
        Map<String, Object> profile;
        try {
            profile = restClient.get()
                    .uri(baseUrl + "/stock/profile2?symbol=" + symbol + "&token=" + apiKey)
                    .retrieve()
                    .body(Map.class);
        } catch (RestClientResponseException e) {
            throw new RuntimeException("Finnhub API Error [" + e.getStatusCode() + "]: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch profile from Finnhub: " + e.getMessage());
        }

        if (profile == null || !profile.containsKey("name") || profile.get("name") == null) {
            throw new RuntimeException("Could not fetch profile for ticker: " + symbol + ". Verify your Finnhub API key in application.properties.");
        }

        Company company = companyRepository.findByTickerIgnoreCase(symbol)
                .orElseGet(Company::new);

        company.setTicker(symbol);
        company.setName((String) profile.get("name"));
        company.setSector((String) profile.get("finnhubIndustry"));
        company.setExchange((String) profile.get("exchange"));
        company.setCountry((String) profile.getOrDefault("country", "US"));
        
        Company savedCompany = companyRepository.save(company);

        // 2. Fetch & Save Real-Time Quote into PriceHistory
        try {
            Map<String, Object> quote = restClient.get()
                    .uri(baseUrl + "/quote?symbol=" + symbol + "&token=" + apiKey)
                    .retrieve()
                    .body(Map.class);

            if (quote != null && quote.get("c") != null) {
                BigDecimal currentPrice = new BigDecimal(quote.get("c").toString());
                BigDecimal highPrice = new BigDecimal(quote.get("h").toString());
                BigDecimal lowPrice = new BigDecimal(quote.get("l").toString());
                BigDecimal openPrice = new BigDecimal(quote.get("o").toString());

                PriceHistory priceHistory = new PriceHistory();
                priceHistory.setCompany(savedCompany);
                priceHistory.setDate(LocalDate.now());
                priceHistory.setOpen(openPrice);
                priceHistory.setHigh(highPrice);
                priceHistory.setLow(lowPrice);
                priceHistory.setClose(currentPrice);
                priceHistory.setSource("FINNHUB");

                priceHistoryRepository.save(priceHistory);
            }
        } catch (Exception e) {
            System.err.println("Warning: Could not fetch quote for " + symbol + ": " + e.getMessage());
        }

        // 3. Fetch & Save Company News
        try {
            LocalDate today = LocalDate.now();
            LocalDate sevenDaysAgo = today.minusDays(7);

            List<Map<String, Object>> newsList = restClient.get()
                    .uri(baseUrl + "/company-news?symbol=" + symbol + "&from=" + sevenDaysAgo + "&to=" + today + "&token=" + apiKey)
                    .retrieve()
                    .body(List.class);

            if (newsList != null) {
                for (Map<String, Object> newsData : newsList) {
                    if (newsData.get("headline") == null) continue;

                    NewsItem newsItem = new NewsItem();
                    newsItem.setCompany(savedCompany);
                    newsItem.setHeadline((String) newsData.get("headline"));
                    newsItem.setSource((String) newsData.get("source"));
                    newsItem.setUrl((String) newsData.get("url"));

                    if (newsData.get("datetime") != null) {
                        long epochSeconds = ((Number) newsData.get("datetime")).longValue();
                        newsItem.setPublishedAt(LocalDateTime.ofInstant(Instant.ofEpochSecond(epochSeconds), ZoneId.systemDefault()));
                    }

                    newsItemRepository.save(newsItem);
                }
            }
        } catch (Exception e) {
            System.err.println("Warning: Could not fetch news for " + symbol + ": " + e.getMessage());
        }

        return savedCompany;
    }
}