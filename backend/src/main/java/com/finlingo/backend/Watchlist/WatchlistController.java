package com.finlingo.backend.Watchlist;

import com.finlingo.backend.company.Company;
import com.finlingo.backend.company.CompanyRepository;
import com.finlingo.backend.user.User;
import com.finlingo.backend.user.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistRepository watchlistRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public WatchlistController(
            WatchlistRepository watchlistRepository,
            UserRepository userRepository,
            CompanyRepository companyRepository
    ) {
        this.watchlistRepository = watchlistRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    private User currentUser(Authentication auth) {

        String email = auth.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }

    @GetMapping
    public List<WatchlistDTO> getWatchlist(
            Authentication auth
    ) {

        User user = currentUser(auth);

        return watchlistRepository
                .findByUserId(user.getId())
                .stream()
                .map(item ->
                        new WatchlistDTO(
                                item.getCompany().getTicker(),
                                item.getCompany().getName(),
                                item.getAddedAt()
                        )
                )
                .toList();
    }

    @PostMapping("/{ticker}")
    public WatchlistDTO addToWatchlist(
            @PathVariable String ticker,
            Authentication auth
    ) {

        User user = currentUser(auth);

        String symbol = ticker.toUpperCase();

        Company company =
                companyRepository
                        .findById(symbol)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found: " + symbol
                                )
                        );

        Watchlist existing =
                watchlistRepository
                        .findByUserIdAndCompanyTicker(
                                user.getId(),
                                symbol
                        )
                        .orElse(null);

        if (existing != null) {

            return new WatchlistDTO(
                    existing.getCompany().getTicker(),
                    existing.getCompany().getName(),
                    existing.getAddedAt()
            );
        }

        Watchlist watchlist =
                new Watchlist();

        watchlist.setUser(user);
        watchlist.setCompany(company);

        Watchlist saved =
                watchlistRepository.save(watchlist);

        return new WatchlistDTO(
                saved.getCompany().getTicker(),
                saved.getCompany().getName(),
                saved.getAddedAt()
        );
    }

    @DeleteMapping("/{ticker}")
    @org.springframework.transaction.annotation.Transactional
    public void removeFromWatchlist(
            @PathVariable String ticker,
            Authentication auth
    ) {

        User user = currentUser(auth);

        watchlistRepository
                .deleteByUserIdAndCompanyTicker(
                        user.getId(),
                        ticker.toUpperCase()
                );
    }
}