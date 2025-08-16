package com.daffy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
@RestController  // Add this to handle root endpoint
public class DaffyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(DaffyBackendApplication.class, args);
    }
    
    // Add a root endpoint to handle base URL requests
    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Daffy Social Network API");
        response.put("status", "Running");
        response.put("version", "1.0.0");
        response.put("endpoints", Map.of(
            "health", "/test/health",
            "info", "/test/info", 
            "auth", "/auth/**",
            "admin", "/admin/**",
            "users", "/users/**"
        ));
        return response;
    }
    
    // Add a simple health check endpoint
    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", System.currentTimeMillis());
        response.put("service", "Daffy Backend API");
        return response;
    }
}