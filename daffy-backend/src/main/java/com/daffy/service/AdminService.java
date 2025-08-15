package com.daffy.service;

import com.daffy.dto.AdminDashboardDto;
import com.daffy.dto.UserDto;
import com.daffy.entity.User;
import com.daffy.exception.ResourceNotFoundException;
import com.daffy.repository.ClubRepository;
import com.daffy.repository.CommentRepository;
import com.daffy.repository.LikeRepository;
import com.daffy.repository.PostRepository;
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
    private final PostRepository postRepository;
    private final ClubRepository clubRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;

    public AdminDashboardDto getDashboardStats() {
        log.info("Generating admin dashboard statistics");
        
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.findActiveUsers(Pageable.unpaged()).getTotalElements();
        long totalPosts = postRepository.count();
        long totalClubs = clubRepository.count();
        long totalComments = commentRepository.count();
        long totalLikes = likeRepository.count();
        
        // Calculate other stats (simplified for now)
        long suspendedUsers = totalUsers - activeUsers; // Simplified calculation
        long deletedUsers = 0;   // TODO: Implement proper status filtering
        
        Map<String, Long> usersByStatus = new HashMap<>();
        usersByStatus.put("ACTIVE", activeUsers);
        usersByStatus.put("SUSPENDED", suspendedUsers);
        usersByStatus.put("DELETED", deletedUsers);
        
        Map<String, Long> postsByType = new HashMap<>();
        postsByType.put("TEXT", totalPosts); // Simplified - you can add proper counting by type
        
        Map<String, Long> clubsByType = new HashMap<>();
        clubsByType.put("ALL", totalClubs); // Simplified - you can add proper counting by type
        
        return AdminDashboardDto.builder()
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .suspendedUsers(suspendedUsers)
                .deletedUsers(deletedUsers)
                .totalPosts(totalPosts)
                .totalClubs(totalClubs)
                .totalComments(totalComments)
                .totalLikes(totalLikes)
                .usersByStatus(usersByStatus)
                .postsByType(postsByType)
                .clubsByType(clubsByType)
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
        health.put("totalUsers", userRepository.count());
        health.put("totalPosts", postRepository.count());
        health.put("totalClubs", clubRepository.count());
        
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
                .emailVerified(user.isEmailVerified())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .lastLoginAt(user.getLastLoginAt())
                .build();
    }
}