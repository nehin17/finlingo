package com.finlingo.backend.company;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "news_items")
public class NewsItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticker")
    private Company company;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String headline;

    @Column(length = 100)
    private String source;

    @Column(columnDefinition = "TEXT")
    private String url;

    @Column(name = "sentiment_score")
    private BigDecimal sentimentScore;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "ingested_at")
    private LocalDateTime ingestedAt = LocalDateTime.now();

    public Integer getId() { return id; }
    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }
    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public BigDecimal getSentimentScore() { return sentimentScore; }
    public void setSentimentScore(BigDecimal sentimentScore) { this.sentimentScore = sentimentScore; }
    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
    public LocalDateTime getIngestedAt() { return ingestedAt; }
}