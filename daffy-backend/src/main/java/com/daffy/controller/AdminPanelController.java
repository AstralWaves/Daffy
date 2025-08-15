package com.daffy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminPanelController {

    // This mapping will be accessible at /api/admin-panel due to context path
    @GetMapping("/admin-panel")
    public String adminPanel() {
        return "admin";
    }
    
    // This mapping will be accessible at /api/admin due to context path
    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }
    
    // Root admin panel accessible at /admin-panel without context path
    @GetMapping("/")
    public String root() {
        return "admin";
    }
}