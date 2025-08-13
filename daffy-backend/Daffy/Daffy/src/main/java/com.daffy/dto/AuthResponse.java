package com.daffy.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String firstName;
    private String lastName;
    private String username;
    private String userType;
}npm install react-scripts