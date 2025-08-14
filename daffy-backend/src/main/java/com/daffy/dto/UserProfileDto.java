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
public class UserProfileDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String bio;
    private String profileImageUrl;
    private String coverImageUrl;
    private String location;
    private String website;
    private LocalDateTime dateOfBirth;
    private User.Gender gender;
    private LocalDateTime createdAt;
}
