package com.daffy.controller;

import com.daffy.dto.AdminDashboardDto;
import com.daffy.dto.UserDto;
import com.daffy.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardDto> getDashboard() {
        log.info("Admin dashboard accessed");
        AdminDashboardDto dashboard = adminService.getDashboardStats();
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/users")
    public ResponseEntity<Page<UserDto>> getAllUsers(Pageable pageable) {
        log.info("Admin fetching all users");
        Page<UserDto> users = adminService.getAllUsers(pageable);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/users/{id}/suspend")
    public ResponseEntity<Void> suspendUser(@PathVariable Long id) {
        log.info("Admin suspending user with id: {}", id);
        adminService.suspendUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/{id}/activate")
    public ResponseEntity<Void> activateUser(@PathVariable Long id) {
        log.info("Admin activating user with id: {}", id);
        adminService.activateUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/{id}/delete")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("Admin deleting user with id: {}", id);
        adminService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/stats")
    public ResponseEntity<Object> getUserStats() {
        log.info("Admin fetching user statistics");
        Object stats = adminService.getUserStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/system/health")
    public ResponseEntity<Object> getSystemHealth() {
        log.info("Admin checking system health");
        Object health = adminService.getSystemHealth();
        return ResponseEntity.ok(health);
    }
}
