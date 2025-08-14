package com.daffy.dto;

import com.daffy.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String bio;
    private String profileImageUrl;
    private String coverImageUrl;
    private String location;
    private String website;
    private LocalDateTime dateOfBirth;
    private User.Gender gender;
    private User.UserStatus status;
    private boolean enabled;
    private boolean locked;
    private boolean emailVerified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastLoginAt;
}
