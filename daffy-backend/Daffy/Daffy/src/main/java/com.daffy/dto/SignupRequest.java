package com.daffy.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String phone;
    private String userType;
    private String department;
    private String semester;
    private Integer joiningYear;
    private Integer graduationYear;
}