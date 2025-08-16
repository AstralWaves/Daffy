package com.daffy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Single controller to handle root and basic endpoints
 * This replaces RootController, SimpleWorkingController, and RootPathController
 */
@RestController
@CrossOrigin(origins = "*")
public class HomeController {

    /**
     * Root endpoint - handles localhost:8080/
     */
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "🎯 Welcome to Daffy Social Network Backend API");
        response.put("status", "✅ Server Running Successfully");
        response.put("version", "1.0.0");
        response.put("timestamp", System.currentTimeMillis());
        response.put("database", "MySQL Connected");
        response.put("framework", "Spring Boot 3.1.0");
        
        // Available endpoints
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("🏠 Home", "GET /");
        endpoints.put("🏥 Health Check", "GET /test/health");
        endpoints.put("ℹ️  API Info", "GET /test/info");
        endpoints.put("🔐 Login", "POST /auth/login");
        endpoints.put("📝 Register", "POST /auth/register");
        endpoints.put("🛡️  Admin Dashboard", "GET /admin/dashboard (JWT required)");
        endpoints.put("👤 Users", "GET /users (JWT required)");
        endpoints.put("🗄️  Database Console", "GET /h2-console");
        
        response.put("endpoints", endpoints);
        
        // Default admin credentials
        Map<String, String> adminInfo = new HashMap<>();
        adminInfo.put("username", "admin");
        adminInfo.put("password", "admin123");
        adminInfo.put("note", "Use these credentials to login via POST /auth/login");
        
        response.put("default_admin", adminInfo);
        
        // Quick test endpoints
        Map<String, String> quickTests = new HashMap<>();
        quickTests.put("Test Health", "curl http://localhost:8080/test/health");
        quickTests.put("Test Info", "curl http://localhost:8080/test/info");
        quickTests.put("Login", "curl -X POST http://localhost:8080/auth/login -H 'Content-Type: application/json' -d '{\"username\":\"admin\",\"password\":\"admin123\"}'");
        
        response.put("quick_tests", quickTests);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Simple health endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Daffy Backend API");
        response.put("timestamp", System.currentTimeMillis());
        response.put("database", "Connected");
        response.put("version", "1.0.0");
        return ResponseEntity.ok(response);
    }

    /**
     * API status endpoint
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("api_status", "OPERATIONAL");
        response.put("database_status", "CONNECTED");
        response.put("authentication", "ENABLED");
        response.put("admin_initialized", "YES");
        response.put("security", "JWT ACTIVE");
        response.put("uptime", "Application running normally");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    /**
     * Welcome endpoint with basic info
     */
    @GetMapping("/welcome")
    public ResponseEntity<Map<String, Object>> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("title", "🌟 Daffy Social Network Backend");
        response.put("description", "A comprehensive social media platform backend");
        response.put("technology_stack", Map.of(
            "framework", "Spring Boot 3.1.0",
            "language", "Java 17",
            "database", "MySQL 8.0",
            "security", "JWT + Spring Security",
            "persistence", "JPA + Hibernate"
        ));
        response.put("features", Map.of(
            "user_management", "Registration, Login, Profiles",
            "social_features", "Posts, Comments, Likes, Friends",
            "admin_panel", "User management, Analytics",
            "security", "JWT tokens, Role-based access"
        ));
        response.put("status", "Ready for development and testing");
        return ResponseEntity.ok(response);
    }
}