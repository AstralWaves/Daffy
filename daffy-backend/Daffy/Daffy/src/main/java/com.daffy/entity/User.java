package com.daffy.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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
    private boolean verified;
}