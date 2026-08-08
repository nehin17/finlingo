package com.finlingo.backend.term;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/terms")
public class FinanceTermController {

    private final FinanceTermRepository repository;

    public FinanceTermController(FinanceTermRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<FinanceTerm> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{term}")
    public FinanceTerm getOne(@PathVariable String term) {
        return repository.findByTermIgnoreCase(term).orElseThrow();
    }

    @PostMapping
    public FinanceTerm create(@RequestBody FinanceTerm term) {
        return repository.save(term);
    }
}