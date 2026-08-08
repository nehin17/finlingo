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

    public WatchlistController(WatchlistRepository watchlistRepository, UserRepository userRepository, CompanyRepository companyRepository) {
        this.watchlistRepository = watchlistRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    private User currentUser(Authentication auth) {
        String email = auth.getName();
        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping
    public List<Watchlist> getWatchlist(Authentication auth) {
        User user = currentUser(auth);
        return watchlistRepository.findByUserId(user.getId());
    }

    @PostMapping("/{ticker}")
    public Watchlist addToWatchlist(@PathVariable String ticker, Authentication auth) {
        User user = currentUser(auth);
        Company company = companyRepository.findById(ticker.toUpperCase()).orElseThrow();

        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);
        watchlist.setCompany(company);
        return watchlistRepository.save(watchlist);
    }

    @DeleteMapping("/{ticker}")
    @org.springframework.transaction.annotation.Transactional
    public void removeFromWatchlist(@PathVariable String ticker, Authentication auth) {
        User user = currentUser(auth);
        watchlistRepository.deleteByUserIdAndCompanyTicker(user.getId(), ticker.toUpperCase());
    }
}