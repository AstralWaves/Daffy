package com.daffy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardDto {
    private Long totalUsers;
    private Long activeUsers;
    private Long suspendedUsers;
    private Long deletedUsers;
    private Long totalPosts;
    private Long totalClubs;
    private Long totalComments;
    private Long totalLikes;
    private Map<String, Long> usersByStatus;
    private Map<String, Long> postsByType;
    private Map<String, Long> clubsByType;
    private LocalDateTime lastUpdated;
}
