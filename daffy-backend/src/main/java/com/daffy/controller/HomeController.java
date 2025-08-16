package com.daffy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.daffy.repository.UserRepository;
import com.daffy.repository.PostRepository;
import com.daffy.repository.ClubRepository;
import com.daffy.repository.RoleRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.LinkedHashMap;

@RestController
public class HomeController {

    @Autowired(required = false)
    private UserRepository userRepository;
    
    @Autowired(required = false)
    private PostRepository postRepository;
    
    @Autowired(required = false)
    private ClubRepository clubRepository;
    
    @Autowired(required = false)
    private RoleRepository roleRepository;

    /**
     * MAIN ROOT ENDPOINT - Your complete backend overview
     */
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new LinkedHashMap<>();
        
        try {
            // === HEADER SECTION ===
            response.put("title", "🎯 DAFFY SOCIAL NETWORK BACKEND API");
            response.put("status", "✅ RUNNING SUCCESSFULLY");
            response.put("timestamp", LocalDateTime.now().toString());
            response.put("server_url", "http://localhost:8080");
            response.put("version", "1.0.0");
            
            // === SYSTEM INFO ===
            Map<String, Object> systemInfo = new LinkedHashMap<>();
            systemInfo.put("framework", "Spring Boot 3.1.0");
            systemInfo.put("java_version", System.getProperty("java.version"));
            systemInfo.put("database", "MySQL 8.0");
            systemInfo.put("security", "JWT + Spring Security");
            systemInfo.put("server_port", "8080");
            response.put("system_info", systemInfo);
            
            // === DATABASE STATS (with error handling) ===
            Map<String, Object> dbStats = new LinkedHashMap<>();
            try {
                if (userRepository != null) {
                    dbStats.put("total_users", userRepository.count());
                    dbStats.put("total_posts", postRepository != null ? postRepository.count() : "N/A");
                    dbStats.put("total_clubs", clubRepository != null ? clubRepository.count() : "N/A");
                    dbStats.put("total_roles", roleRepository != null ? roleRepository.count() : "N/A");
                    dbStats.put("database_status", "🟢 CONNECTED");
                } else {
                    dbStats.put("database_status", "🟡 REPOSITORIES NOT LOADED YET");
                    dbStats.put("note", "Database will be available after full startup");
                }
            } catch (Exception e) {
                dbStats.put("database_status", "🔴 ERROR: " + e.getMessage());
            }
            response.put("database_stats", dbStats);
            
            // === AUTHENTICATION ===
            Map<String, Object> authInfo = new LinkedHashMap<>();
            authInfo.put("default_admin_username", "admin");
            authInfo.put("default_admin_password", "admin123");
            authInfo.put("jwt_enabled", "✅ YES");
            authInfo.put("login_endpoint", "POST /auth/login");
            authInfo.put("register_endpoint", "POST /auth/register");
            response.put("authentication", authInfo);
            
            // === ALL ENDPOINTS ===
            Map<String, Object> endpoints = new LinkedHashMap<>();
            
            // Core endpoints
            Map<String, String> coreEndpoints = new LinkedHashMap<>();
            coreEndpoints.put("🏠 Home", "GET /");
            coreEndpoints.put("🏥 Health", "GET /test/health");
            coreEndpoints.put("ℹ️ Info", "GET /test/info");
            coreEndpoints.put("📊 Status", "GET /status");
            coreEndpoints.put("🏓 Ping", "GET /ping");
            endpoints.put("core", coreEndpoints);
            
            // Authentication endpoints
            Map<String, String> authEndpoints = new LinkedHashMap<>();
            authEndpoints.put("🔐 Login", "POST /auth/login");
            authEndpoints.put("📝 Register", "POST /auth/register");
            authEndpoints.put("🔄 Refresh", "POST /auth/refresh");
            authEndpoints.put("❤️ Auth Health", "GET /auth/health");
            endpoints.put("authentication", authEndpoints);
            
            // Admin endpoints
            Map<String, String> adminEndpoints = new LinkedHashMap<>();
            adminEndpoints.put("🛡️ Dashboard", "GET /admin/dashboard (JWT required)");
            adminEndpoints.put("👥 All Users", "GET /admin/users (JWT required)");
            adminEndpoints.put("📈 User Stats", "GET /admin/users/stats (JWT required)");
            adminEndpoints.put("🏥 System Health", "GET /admin/system/health (JWT required)");
            endpoints.put("admin", adminEndpoints);
            
            // User endpoints
            Map<String, String> userEndpoints = new LinkedHashMap<>();
            userEndpoints.put("👤 Get User", "GET /users/{id} (JWT required)");
            userEndpoints.put("📋 Profile", "GET /users/{id}/profile (JWT required)");
            userEndpoints.put("👤 Current User", "GET /users/me (JWT required)");
            userEndpoints.put("🔍 Search Users", "GET /users/search?keyword= (JWT required)");
            endpoints.put("users", userEndpoints);
            
            // Development tools
            Map<String, String> devEndpoints = new LinkedHashMap<>();
            devEndpoints.put("🗄️ DB Console", "GET /h2-console");
            devEndpoints.put("📱 Admin Panel", "GET /admin-panel");
            endpoints.put("development", devEndpoints);
            
            response.put("api_endpoints", endpoints);
            
            // === QUICK START ===
            Map<String, String> quickStart = new LinkedHashMap<>();
            quickStart.put("1_test_health", "curl http://localhost:8080/test/health");
            quickStart.put("2_login", "curl -X POST http://localhost:8080/auth/login -H 'Content-Type: application/json' -d '{\"username\":\"admin\",\"password\":\"admin123\"}'");
            quickStart.put("3_admin_dashboard", "curl -H 'Authorization: Bearer YOUR_JWT_TOKEN' http://localhost:8080/admin/dashboard");
            quickStart.put("4_register_user", "curl -X POST http://localhost:8080/auth/register -H 'Content-Type: application/json' -d '{\"username\":\"test\",\"email\":\"test@test.com\",\"password\":\"password123\",\"firstName\":\"Test\",\"lastName\":\"User\"}'");
            response.put("quick_start_commands", quickStart);
            
            // === FEATURES ===
            Map<String, String> features = new LinkedHashMap<>();
            features.put("👥 User Management", "Registration, Login, Profiles, Admin controls");
            features.put("🔐 Authentication", "JWT tokens, Role-based security");
            features.put("🛡️ Admin Panel", "User management, System monitoring");
            features.put("📊 Database", "MySQL with JPA/Hibernate, Live statistics");
            features.put("🌐 REST API", "Complete RESTful API with JSON responses");
            features.put("🏢 Social Features", "Posts, Comments, Likes, Clubs (Ready for use)");
            response.put("features", features);
            
            response.put("note", "✨ Your Daffy Social Network Backend is fully operational!");
            response.put("success", true);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            // Fallback response if anything fails
            Map<String, Object> fallbackResponse = new HashMap<>();
            fallbackResponse.put("message", "Daffy Backend API is running!");
            fallbackResponse.put("status", "SUCCESS");
            fallbackResponse.put("error_details", e.getMessage());
            fallbackResponse.put("timestamp", LocalDateTime.now().toString());
            fallbackResponse.put("basic_endpoints", Map.of(
                "health", "GET /test/health",
                "login", "POST /auth/login",
                "admin", "GET /admin-panel"
            ));
            return ResponseEntity.ok(fallbackResponse);
        }
    }

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "pong");
        response.put("status", "SUCCESS");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "🟢 OPERATIONAL");
        response.put("service", "Daffy Social Network API");
        response.put("version", "1.0.0");
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }
}