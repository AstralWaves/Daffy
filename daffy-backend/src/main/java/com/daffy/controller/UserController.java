package com.daffy.controller;

import com.daffy.dto.UserDto;
import com.daffy.dto.UserProfileDto;
import com.daffy.security.UserPrincipal;
import com.daffy.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        log.info("Fetching user with id: {}", id);
        UserDto user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserProfileDto> getUserProfile(@PathVariable Long id) {
        log.info("Fetching profile for user with id: {}", id);
        UserProfileDto profile = userService.getUserProfile(id);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/{id}/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateUserProfile(
            @PathVariable Long id,
            @Valid @RequestBody UserProfileDto profileDto,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        log.info("Updating profile for user with id: {}", id);
        UserDto updatedUser = userService.updateUserProfile(id, profileDto, currentUser);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<UserDto>> searchUsers(
            @RequestParam String keyword,
            Pageable pageable) {
        log.info("Searching users with keyword: {}", keyword);
        Page<UserDto> users = userService.searchUsers(keyword, pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/active")
    public ResponseEntity<Page<UserDto>> getActiveUsers(Pageable pageable) {
        log.info("Fetching active users");
        Page<UserDto> users = userService.getActiveUsers(pageable);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("Deleting user with id: {}", id);
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        log.info("Fetching current user profile");
        UserDto user = userService.getUserById(currentUser.getId());
        return ResponseEntity.ok(user);
    }
}
