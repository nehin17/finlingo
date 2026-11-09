package com.finlingo.backend.auth;

import com.finlingo.backend.auth.dto.LoginRequest;
import com.finlingo.backend.auth.dto.RegisterRequest;
import com.finlingo.backend.user.User;
import com.finlingo.backend.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody RegisterRequest body) {
        if (userRepository.findByEmail(body.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setDisplayName(body.getName());
        user.setEmail(body.getEmail());
        user.setPasswordHash(passwordEncoder.encode(body.getPassword()));

        String difficulty = body.getDifficulty();
        if (difficulty == null || difficulty.isBlank()) {
            difficulty = "beginner";
        }
        user.setDifficultyLevel(difficulty);
        user.setProfilePicture(body.getProfilePicture());

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        return Map.of(
            "token", token,
            "email", user.getEmail(),
            "displayName", user.getDisplayName() != null ? user.getDisplayName() : "",
            "difficultyLevel", user.getDifficultyLevel()
        );
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest body) {
        User user = userRepository.findByEmail(body.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(body.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return Map.of(
            "token", token,
            "email", user.getEmail(),
            "displayName", user.getDisplayName() != null ? user.getDisplayName() : "",
            "difficultyLevel", user.getDifficultyLevel() != null ? user.getDifficultyLevel() : "beginner"
        );
    }

    @GetMapping("/me")
    public Map<String, Object> me(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return Map.of(
            "email", user.getEmail(),
            "displayName", user.getDisplayName() != null ? user.getDisplayName() : "",
            "difficultyLevel", user.getDifficultyLevel() != null ? user.getDifficultyLevel() : "beginner"
        );
    }
}