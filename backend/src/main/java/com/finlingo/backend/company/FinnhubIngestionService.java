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

    public FinnhubIngestionService(
            CompanyRepository companyRepository,
            PriceHistoryRepository priceHistoryRepository,
            NewsItemRepository newsItemRepository
    ) {
        this.companyRepository = companyRepository;
        this.priceHistoryRepository = priceHistoryRepository;
        this.newsItemRepository = newsItemRepository;
        this.restClient = RestClient.create();
    }

    public Company ingestCompany(String ticker) {

        String symbol = ticker.toUpperCase();

        // =====================================================
        // 1. COMPANY PROFILE
        // =====================================================

        Map<String, Object> profile;

        try {
            profile = restClient.get()
                    .uri(baseUrl
                            + "/stock/profile2?symbol="
                            + symbol
                            + "&token="
                            + apiKey)
                    .retrieve()
                    .body(Map.class);

        } catch (RestClientResponseException e) {

            throw new RuntimeException(
                    "Finnhub API Error ["
                            + e.getStatusCode()
                            + "]: "
                            + e.getResponseBodyAsString()
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to fetch profile from Finnhub: "
                            + e.getMessage()
            );
        }

        if (profile == null
                || profile.get("name") == null) {

            throw new RuntimeException(
                    "Could not fetch profile for ticker: "
                            + symbol
            );
        }

        Company company = companyRepository
                .findByTickerIgnoreCase(symbol)
                .orElseGet(Company::new);

        company.setTicker(symbol);
        company.setName(
                String.valueOf(profile.get("name"))
        );

        company.setSector(
                stringValue(profile.get("finnhubIndustry"))
        );

        company.setExchange(
                stringValue(profile.get("exchange"))
        );

        company.setCountry(
                stringValue(
                        profile.getOrDefault(
                                "country",
                                "US"
                        )
                )
        );

        Company savedCompany =
                companyRepository.save(company);


        // =====================================================
        // 2. CURRENT QUOTE
        // =====================================================

        Map<String, Object> quote = null;

        try {

            quote = restClient.get()
                    .uri(baseUrl
                            + "/quote?symbol="
                            + symbol
                            + "&token="
                            + apiKey)
                    .retrieve()
                    .body(Map.class);

        } catch (Exception e) {

            System.err.println(
                    "Warning: Could not fetch quote for "
                            + symbol
                            + ": "
                            + e.getMessage()
            );
        }

        if (quote != null && quote.get("c") != null) {

            BigDecimal currentPrice =
                    decimalValue(quote.get("c"));

            BigDecimal highPrice =
                    decimalValue(quote.get("h"));

            BigDecimal lowPrice =
                    decimalValue(quote.get("l"));

            BigDecimal openPrice =
                    decimalValue(quote.get("o"));

            BigDecimal previousClose =
                    decimalValue(quote.get("pc"));

            // ---------------------------------------------
            // Calculate daily change
            // ---------------------------------------------

            if (currentPrice != null
                    && previousClose != null
                    && previousClose.compareTo(BigDecimal.ZERO) != 0) {

                BigDecimal change =
                        currentPrice
                                .subtract(previousClose)
                                .divide(
                                        previousClose,
                                        6,
                                        java.math.RoundingMode.HALF_UP
                                )
                                .multiply(
                                        BigDecimal.valueOf(100)
                                );

                // We store the percentage change
                // in CompanyResearchDTO later.
                System.out.println(
                        symbol
                                + " change: "
                                + change
                                + "%"
                );
            }

            // ---------------------------------------------
            // UPSERT TODAY'S PRICE
            // ---------------------------------------------

            LocalDate today =
                    LocalDate.now();

            PriceHistory priceHistory =
                    priceHistoryRepository
                            .findByCompanyTickerAndDate(
                                    symbol,
                                    today
                            )
                            .orElseGet(
                                    PriceHistory::new
                            );

            priceHistory.setCompany(
                    savedCompany
            );

            priceHistory.setDate(today);
            priceHistory.setOpen(openPrice);
            priceHistory.setHigh(highPrice);
            priceHistory.setLow(lowPrice);
            priceHistory.setClose(currentPrice);
            priceHistory.setSource("FINNHUB");
            priceHistory.setFetchedAt(
                    LocalDateTime.now()
            );

            priceHistoryRepository.save(
                    priceHistory
            );
        }


        // =====================================================
        // 3. BASIC FINANCIALS
        // =====================================================

        try {

            Map<String, Object> financials =
                    restClient.get()
                            .uri(baseUrl
                                    + "/stock/metric?symbol="
                                    + symbol
                                    + "&metric=all"
                                    + "&token="
                                    + apiKey)
                            .retrieve()
                            .body(Map.class);

            if (financials != null) {

                Map<String, Object> metric =
                        (Map<String, Object>)
                                financials.get("metric");

                if (metric != null) {

                    /*
                     * Finnhub's marketCap is normally
                     * reported in millions.
                     */

                    BigDecimal marketCap =
                            decimalValue(
                                    metric.get("marketCapitalization")
                            );

                    BigDecimal pe =
                            decimalValue(
                                    metric.get("peBasicExclExtraTTM")
                            );

                    /*
                     * Revenue growth can appear under
                     * different metric names depending
                     * on the company.
                     */

                    BigDecimal revenueGrowth =
                            decimalValue(
                                    metric.get(
                                            "revenueGrowthTTMYoy"
                                    )
                            );

                    if (revenueGrowth == null) {

                        revenueGrowth =
                                decimalValue(
                                        metric.get(
                                                "revenueGrowth5Y"
                                        )
                                );
                    }

                    savedCompany.setMarketCapitalization(
                            marketCap
                    );

                    savedCompany.setPeRatio(pe);

                    savedCompany.setRevenueGrowth(
                            revenueGrowth
                    );

                    savedCompany =
                            companyRepository.save(
                                    savedCompany
                            );
                }
            }

        } catch (Exception e) {

            System.err.println(
                    "Warning: Could not fetch financials for "
                            + symbol
                            + ": "
                            + e.getMessage()
            );
        }


        // =====================================================
        // 4. HISTORICAL PRICE DATA
        // =====================================================

        try {

            LocalDate today =
                    LocalDate.now();

            LocalDate from =
                    today.minusDays(30);

            long fromEpoch =
                    from.atStartOfDay(
                            ZoneId.systemDefault()
                    )
                    .toEpochSecond();

            long toEpoch =
                    today.plusDays(1)
                            .atStartOfDay(
                                    ZoneId.systemDefault()
                            )
                            .toEpochSecond();

            Map<String, Object> candles =
                    restClient.get()
                            .uri(baseUrl
                                    + "/stock/candle?symbol="
                                    + symbol
                                    + "&resolution=D"
                                    + "&from="
                                    + fromEpoch
                                    + "&to="
                                    + toEpoch
                                    + "&token="
                                    + apiKey)
                            .retrieve()
                            .body(Map.class);

            if (candles != null
                    && "ok".equals(
                            candles.get("s")
                    )) {

                List<?> timestamps =
                        (List<?>) candles.get("t");

                List<?> opens =
                        (List<?>) candles.get("o");

                List<?> highs =
                        (List<?>) candles.get("h");

                List<?> lows =
                        (List<?>) candles.get("l");

                List<?> closes =
                        (List<?>) candles.get("c");

                List<?> volumes =
                        (List<?>) candles.get("v");

                if (timestamps != null) {

                    for (int i = 0;
                         i < timestamps.size();
                         i++) {

                        LocalDate date =
                                Instant.ofEpochSecond(
                                        ((Number)
                                                timestamps
                                                        .get(i))
                                                .longValue()
                                )
                                .atZone(
                                        ZoneId.systemDefault()
                                )
                                .toLocalDate();

                        PriceHistory history =
                                priceHistoryRepository
                                        .findByCompanyTickerAndDate(
                                                symbol,
                                                date
                                        )
                                        .orElseGet(
                                                PriceHistory::new
                                        );

                        history.setCompany(
                                savedCompany
                        );

                        history.setDate(date);

                        history.setOpen(
                                decimalValue(
                                        opens.get(i)
                                )
                        );

                        history.setHigh(
                                decimalValue(
                                        highs.get(i)
                                )
                        );

                        history.setLow(
                                decimalValue(
                                        lows.get(i)
                                )
                        );

                        history.setClose(
                                decimalValue(
                                        closes.get(i)
                                )
                        );

                        if (volumes != null
                                && i < volumes.size()) {

                            Object volume =
                                    volumes.get(i);

                            if (volume instanceof Number) {

                                history.setVolume(
                                        ((Number) volume)
                                                .longValue()
                                );
                            }
                        }

                        history.setSource(
                                "FINNHUB"
                        );

                        history.setFetchedAt(
                                LocalDateTime.now()
                        );

                        priceHistoryRepository.save(
                                history
                        );
                    }
                }
            }

        } catch (Exception e) {

            System.err.println(
                    "Warning: Could not fetch historical prices for "
                            + symbol
                            + ": "
                            + e.getMessage()
            );
        }


        // =====================================================
        // 5. COMPANY NEWS
        // =====================================================

        try {

            LocalDate today =
                    LocalDate.now();

            LocalDate sevenDaysAgo =
                    today.minusDays(7);

            List<Map<String, Object>> newsList =
                    restClient.get()
                            .uri(baseUrl
                                    + "/company-news?symbol="
                                    + symbol
                                    + "&from="
                                    + sevenDaysAgo
                                    + "&to="
                                    + today
                                    + "&token="
                                    + apiKey)
                            .retrieve()
                            .body(List.class);

            if (newsList != null) {

                for (
                        Map<String, Object> newsData
                        : newsList
                ) {

                    if (newsData.get("headline")
                            == null) {
                        continue;
                    }

                    NewsItem newsItem =
                            new NewsItem();

                    newsItem.setCompany(
                            savedCompany
                    );

                    newsItem.setHeadline(
                            stringValue(
                                    newsData.get(
                                            "headline"
                                    )
                            )
                    );

                    newsItem.setSource(
                            stringValue(
                                    newsData.get(
                                            "source"
                                    )
                            )
                    );

                    newsItem.setUrl(
                            stringValue(
                                    newsData.get(
                                            "url"
                                    )
                            )
                    );

                    if (newsData.get("datetime")
                            != null) {

                        long epochSeconds =
                                ((Number)
                                        newsData.get(
                                                "datetime"
                                        ))
                                        .longValue();

                        newsItem.setPublishedAt(
                                LocalDateTime.ofInstant(
                                        Instant.ofEpochSecond(
                                                epochSeconds
                                        ),
                                        ZoneId.systemDefault()
                                )
                        );
                    }

                    newsItemRepository.save(
                            newsItem
                    );
                }
            }

        } catch (Exception e) {

            System.err.println(
                    "Warning: Could not fetch news for "
                            + symbol
                            + ": "
                            + e.getMessage()
            );
        }

        return savedCompany;
    }


    // =========================================================
    // HELPERS
    // =========================================================

    private BigDecimal decimalValue(Object value) {

        if (value == null) {
            return null;
        }

        try {
            return new BigDecimal(
                    value.toString()
            );
        } catch (Exception e) {
            return null;
        }
    }


    private String stringValue(Object value) {

        if (value == null) {
            return null;
        }

        return value.toString();
    }
}