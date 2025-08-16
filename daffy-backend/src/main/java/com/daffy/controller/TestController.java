package com.daffy.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", System.currentTimeMillis());
        response.put("service", "Daffy Backend");
        return response;
    }

    @GetMapping("/info")
    public Map<String, Object> info() {
        Map<String, Object> response = new HashMap<>();
        response.put("name", "Daffy Social Network Backend");
        response.put("version", "1.0.0");
        response.put("description", "A comprehensive social media backend system");
        response.put("technology", "Spring Boot, Java 17, JWT, JPA");
        return response;
    }
    
    /**
     * Test endpoint - handles localhost:8080/test
     */
    @GetMapping("")
    public Map<String, Object> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "🎯 Daffy Backend API - Test Endpoint");
        response.put("status", "✅ Running");
        response.put("available_endpoints", Map.of(
            "health", "/test/health",
            "info", "/test/info",
            "auth_login", "/auth/login",
            "admin_panel", "/admin-panel"
        ));
        return response;
    }
}

// REMOVED: RootPathController class that was causing the conflict
// The HomeController already handles the root "/" endpoint