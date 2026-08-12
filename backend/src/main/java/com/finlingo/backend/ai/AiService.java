package com.finlingo.backend.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Map;

@Service
public class AiService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestClient restClient;

    public AiService() {
        this.restClient = RestClient.builder().build();
    }

    public String generateAnswer(String ticker, String userQuestion, String companyDataContext) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + geminiApiKey;

        String prompt = String.format(
            "Company Data Context for %s:\n%s\n\nUser Question: %s",
            ticker, companyDataContext, userQuestion
        );

        Map<String, Object> requestBody = Map.of(
            "systemInstruction", Map.of(
                "parts", List.of(Map.of("text", "You are FinLingo AI, a concise financial analyst assistant. Base your answers strictly on the provided company context. If the data is not in the context, clearly state that you don't know based on the provided data."))
            ),
            "contents", List.of(
                Map.of("parts", List.of(Map.of("text", prompt)))
            )
        );

        try {
            Map<?, ?> response = restClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(Map.class);

            if (response != null && response.containsKey("candidates")) {
                List<?> candidates = (List<?>) response.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<?, ?> firstCandidate = (Map<?, ?>) candidates.get(0);
                    Map<?, ?> content = (Map<?, ?>) firstCandidate.get("content");
                    List<?> parts = (List<?>) content.get("parts");
                    Map<?, ?> firstPart = (Map<?, ?>) parts.get(0);
                    return (String) firstPart.get("text");
                }
            }
            return "Unable to retrieve a valid response from the AI engine.";
        } catch (Exception e) {
            return "AI Service temporary error: " + e.getMessage();
        }
    }
}