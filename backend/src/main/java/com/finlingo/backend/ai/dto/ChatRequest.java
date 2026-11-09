package com.finlingo.backend.ai.dto;

public class ChatRequest {
    private String message;
    private String ticker;

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }
}