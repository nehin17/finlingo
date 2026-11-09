package com.finlingo.backend.auth.dto;

import java.util.List;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private List<String> interests;
    private String difficulty;
    private String profilePicture;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }
}