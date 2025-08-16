package com.daffy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller to handle the root URL requests and redirect to appropriate pages
 * Note: This conflicts with the @RestController in DaffyBackendApplication
 * Remove this class if you want to use the main application class for root handling
 */
@Controller
public class RootController {

    /**
     * Handles requests to the root URL and serves the index.html page
     * @return the name of the view to render
     */
    @GetMapping("/index")
    public String index() {
        return "forward:/index.html";
    }
    
    /**
     * Alternative API endpoint for root access
     */
    @GetMapping("/api")
    @ResponseBody
    public Map<String, Object> apiRoot() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Daffy Social Network API");
        response.put("version", "1.0.0");
        response.put("status", "Running");
        return response;
    }
}