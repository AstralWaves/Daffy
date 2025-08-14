package com.daffy.service;

import com.daffy.dto.AdminDashboardDto;
import com.daffy.dto.UserDto;
import com.daffy.entity.User;
import com.daffy.exception.ResourceNotFoundException;
import com.daffy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AdminService {

    private final UserRepository userRepository;

    public AdminDashboardDto getDashboardStats() {
        log.info("Generating admin dashboard statistics");
        
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.findActiveUsers(Pageable.unpaged()).getTotalElements();
        
        // Calculate other stats (simplified for now)
        long suspendedUsers = 0; // TODO: Implement when status filtering is added
        long deletedUsers = 0;   // TODO: Implement when status filtering is added
        
        Map<String, Long> usersByStatus = new HashMap<>();
        usersByStatus.put("ACTIVE", activeUsers);
        usersByStatus.put("SUSPENDED", suspendedUsers);
        usersByStatus.put("DELETED", deletedUsers);
        
        return AdminDashboardDto.builder()
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .suspendedUsers(suspendedUsers)
                .deletedUsers(deletedUsers)
                .totalPosts(0L) // TODO: Implement when PostRepository is available
                .totalClubs(0L) // TODO: Implement when ClubRepository is available
                .totalComments(0L) // TODO: Implement when CommentRepository is available
                .totalLikes(0L) // TODO: Implement when LikeRepository is available
                .usersByStatus(usersByStatus)
                .postsByType(new HashMap<>())
                .clubsByType(new HashMap<>())
                .lastUpdated(LocalDateTime.now())
                .build();
    }

    public Page<UserDto> getAllUsers(Pageable pageable) {
        log.info("Admin fetching all users");
        return userRepository.findAll(pageable).map(this::mapToDto);
    }

    public void suspendUser(Long userId) {
        log.info("Admin suspending user with id: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.SUSPENDED);
        user.setEnabled(false);
        userRepository.save(user);
    }

    public void activateUser(Long userId) {
        log.info("Admin activating user with id: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.ACTIVE);
        user.setEnabled(true);
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        log.info("Admin deleting user with id: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.DELETED);
        user.setEnabled(false);
        userRepository.save(user);
    }

    public Object getUserStats() {
        log.info("Admin fetching user statistics");
        Map<String, Object> stats = new HashMap<>();
        
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.findActiveUsers(Pageable.unpaged()).getTotalElements();
        
        stats.put("totalUsers", totalUsers);
        stats.put("activeUsers", activeUsers);
        stats.put("inactiveUsers", totalUsers - activeUsers);
        stats.put("lastUpdated", LocalDateTime.now());
        
        return stats;
    }

    public Object getSystemHealth() {
        log.info("Admin checking system health");
        Map<String, Object> health = new HashMap<>();
        
        health.put("status", "HEALTHY");
        health.put("timestamp", LocalDateTime.now());
        health.put("version", "1.0.0");
        health.put("database", "CONNECTED");
        
        return health;
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .status(user.getStatus())
                .enabled(user.isEnabled())
                .locked(user.isLocked())
                .createdAt(user.getCreatedAt())
                .lastLoginAt(user.getLastLoginAt())
                .build();
    }
}
