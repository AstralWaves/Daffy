package com.daffy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class AdminPanelController {

    /**
     * Admin panel endpoint - returns JSON response for now
     * Later you can return a view name when you have templates configured
     */
    @GetMapping("/admin-panel")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> adminPanel() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Admin Panel Access Point");
        response.put("status", "Available");
        response.put("login_required", true);
        response.put("admin_api_endpoint", "/admin/dashboard");
        response.put("auth_endpoint", "/auth/login");
        
        Map<String, String> credentials = new HashMap<>();
        credentials.put("default_admin_username", "admin");
        credentials.put("default_admin_password", "admin123");
        response.put("default_credentials", credentials);
        
        return ResponseEntity.ok(response);
    }
}