package com.finlingo.backend.ai;

import com.finlingo.backend.ai.dto.ChatRequest;
import com.finlingo.backend.company.CompanyRepository;
import com.finlingo.backend.company.Company; // Make sure this matches your entity
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;
    private final CompanyRepository companyRepository;

    public AiController(AiService aiService, CompanyRepository companyRepository) {
        this.aiService = aiService;
        this.companyRepository = companyRepository;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody ChatRequest request) {
        String ticker = request.getTicker() != null ? request.getTicker().toUpperCase() : "UNKNOWN";
        
        String context = "No specific data found in DB for " + ticker;
        try {
            // Using the findByTicker method you added to the repository
            Optional<Company> companyData = companyRepository.findByTicker(ticker);
            if (companyData.isPresent()) {
                context = companyData.get().toString(); 
            }
        } catch (Exception e) {
            System.out.println("Could not fetch company: " + e.getMessage());
        }

        String answer = aiService.generateAnswer(ticker, request.getMessage(), context);
        
        // This returns {"response": "the AI's actual answer"} without needing a custom class!
        return ResponseEntity.ok(Map.of("response", answer));
    }
}