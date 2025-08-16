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
     * Admin panel API endpoint - returns JSON with system information
     */
    @GetMapping("/api/admin-panel-info")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> adminPanelInfo() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Admin Panel Access Point");
        response.put("status", "Available");
        response.put("loginRequired", true);
        response.put("adminApiEndpoint", "/admin/dashboard");
        response.put("authEndpoint", "/auth/login");
        
        Map<String, String> credentials = new HashMap<>();
        credentials.put("username", "admin");
        credentials.put("password", "admin123");
        response.put("defaultAdminCredentials", credentials);
        
        return ResponseEntity.ok(response);
    }
}