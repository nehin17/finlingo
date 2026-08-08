package com.finlingo.backend.Watchlist;

import com.finlingo.backend.company.Company;
import com.finlingo.backend.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "watchlists", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "company_ticker"}))
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "company_ticker")
    private Company company;

    @Column(name = "added_at")
    private LocalDateTime addedAt = LocalDateTime.now();

    public Integer getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }
    public LocalDateTime getAddedAt() { return addedAt; }
}