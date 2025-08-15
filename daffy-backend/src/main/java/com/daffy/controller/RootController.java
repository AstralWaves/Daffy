package com.daffy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller to handle the root URL requests and redirect to appropriate pages
 */
@Controller
public class RootController {

    /**
     * Handles requests to the root URL and serves the index.html page
     * @return the name of the view to render
     */
    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }
}