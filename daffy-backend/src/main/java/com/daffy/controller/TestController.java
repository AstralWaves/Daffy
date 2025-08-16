package com.daffy.controller;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Map<String, Object>> health() {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "UP");
            response.put("timestamp", System.currentTimeMillis());
            response.put("service", "Daffy Backend");
            response.put("database", "MySQL Connected");
            response.put("version", "1.0.0");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "DOWN");
            response.put("error", e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("name", "Daffy Social Network Backend");
            response.put("version", "1.0.0");
            response.put("description", "A comprehensive social media backend system");
            response.put("technology", "Spring Boot, Java 17, JWT, JPA");
            response.put("database", "MySQL 8.0");
            response.put("security", "JWT Authentication");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Failed to load info");
            response.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Test endpoint - handles localhost:8080/test
     */
    @GetMapping({"", "/"})
    public ResponseEntity<Map<String, Object>> root() {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "🎯 Daffy Backend API - Test Endpoint");
            response.put("status", "✅ Running");
            response.put("available_endpoints", Map.of(
                "health", "/test/health",
                "info", "/test/info",
                "auth_login", "/auth/login",
                "admin_panel", "/admin-panel"
            ));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Test endpoint failed");
            response.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Debug endpoint to test basic functionality
     */
    @GetMapping("/debug")
    public ResponseEntity<Map<String, Object>> debug() {
        Map<String, Object> response = new HashMap<>();
        response.put("java_version", System.getProperty("java.version"));
        response.put("spring_active", "YES");
        response.put("timestamp", System.currentTimeMillis());
        response.put("memory_total", Runtime.getRuntime().totalMemory());
        response.put("memory_free", Runtime.getRuntime().freeMemory());
        return ResponseEntity.ok(response);
    }
}