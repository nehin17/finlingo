package com.finlingo.backend.company;

import java.math.BigDecimal;
import java.util.List;


public class CompanyResearchDTO {

    private String ticker;
    private String name;
    private String sector;
    private String description;
    private String exchange;
    private String country;
    private BigDecimal marketCapitalization;
    private BigDecimal pe;
    private BigDecimal revenueGrowth;
    private String market;

    private BigDecimal price;
    private BigDecimal change;
    private boolean positive;

    private BigDecimal open;
    private BigDecimal high;
    private BigDecimal low;
    private Long volume;

    private List<PricePointDTO> chartData;

    public CompanyResearchDTO() {
    }

    public CompanyResearchDTO(
            String ticker,
            String name,
            String sector,
            String description,
            String exchange,
            String country,
            BigDecimal price,
            BigDecimal change,
            boolean positive,
            BigDecimal marketCapitalization,
            BigDecimal pe,
            BigDecimal revenueGrowth,
            BigDecimal open,
            BigDecimal high,
            BigDecimal low,
            Long volume,
            List<PricePointDTO> chartData
    ) {
        this.ticker = ticker;
        this.name = name;
        this.sector = sector;
        this.description = description;
        this.exchange = exchange;
        this.country = country;
        this.price = price;
        this.change = change;
        this.positive = positive;
        this.open = open;
        this.high = high;
        this.low = low;
        this.volume = volume;
        this.chartData = chartData;
        this.marketCapitalization = marketCapitalization;
        this.pe = pe;
        this.revenueGrowth = revenueGrowth;
    }

    public String getTicker() {
        return ticker;
    }

    public String getName() {
        return name;
    }

    public String getSector() {
        return sector;
    }

    public String getDescription() {
        return description;
    }

    public String getExchange() {
        return exchange;
    }

    public String getCountry() {
        return country;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getChange() {
        return change;
    }

    public boolean isPositive() {
        return positive;
    }

    public BigDecimal getOpen() {
        return open;
    }

    public BigDecimal getHigh() {
        return high;
    }

    public BigDecimal getLow() {
        return low;
    }

    public Long getVolume() {
        return volume;
    }

    public List<PricePointDTO> getChartData() {
        return chartData;
    }
    public String getMarket() {
        return market;
    }

    public BigDecimal getMarketCapitalization() {
        return marketCapitalization;
    }

    public BigDecimal getPe() {
        return pe;
    }

    public BigDecimal getRevenueGrowth() {
        return revenueGrowth;
    }

    public static class PricePointDTO {

        private String date;
        private BigDecimal value;

        public PricePointDTO(String date, BigDecimal value) {
            this.date = date;
            this.value = value;
        }

        public String getDate() {
            return date;
        }

        public BigDecimal getValue() {
            return value;
        }
    }
}