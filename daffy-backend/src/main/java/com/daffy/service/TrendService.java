
package com.daffy.service;

import com.daffy.dto.HashtagDto;
import com.daffy.dto.TrendDto;
import com.daffy.entity.Hashtag;
import com.daffy.entity.Post;
import com.daffy.repository.HashtagRepository;
import com.daffy.repository.PostRepository;
import com.daffy.repository.LikeRepository;
import com.daffy.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor()
@Slf4j
public class TrendService {

    private final PostRepository postRepository;
    private final HashtagRepository hashtagRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;

    public List<TrendDto> getTrendingTopics() {
        log.info("Fetching trending topics");
        
        List<TrendDto> trends = new ArrayList<>();
        
        // Generate trending topics based on recent posts and engagement
        Page<Post> recentPosts = postRepository.findRecentPosts(
            LocalDateTime.now().minusDays(7), 
            Pageable.ofSize(20)
        );
        
        // Create trends from popular posts
        for (Post post : recentPosts.getContent()) {
            long likes = likeRepository.countLikesByPost(post.getId());
            long comments = commentRepository.countCommentsByPost(post.getId());
            long engagement = likes + comments;
            
            if (engagement > 5) { // Minimum engagement threshold
                TrendDto trend = TrendDto.builder()
                    .id(post.getId())
                    .title(extractTitleFromPost(post.getContent()))
                    .description(truncateContent(post.getContent(), 100))
                    .category(determineCategoryFromContent(post.getContent()))
                    .posts(1L)
                    .views(engagement * 3) // Estimated views
                    .time(formatTimeAgo(post.getCreatedAt()))
                    .trending(true)
                    .build();
                trends.add(trend);
            }
        }
        
        // Add some default trending topics if none found
        if (trends.isEmpty()) {
            trends.addAll(getDefaultTrends());
        }
        
        return trends.stream().limit(10).collect(Collectors.toList());
    }

    public List<HashtagDto> getTrendingHashtags() {
        log.info("Fetching trending hashtags");
        
        List<Hashtag> hashtags = hashtagRepository.findTopHashtagsByUsage(Pageable.ofSize(10));
        
        if (hashtags.isEmpty()) {
            return getDefaultHashtags();
        }
        
        return hashtags.stream()
            .map(this::convertToHashtagDto)
            .collect(Collectors.toList());
    }

    public List<TrendDto> getTrendsByHashtag(String hashtagName) {
        log.info("Fetching trends for hashtag: {}", hashtagName);
        
        Page<Post> hashtagPosts = postRepository.findPostsByHashtag(hashtagName, Pageable.ofSize(20));
        
        return hashtagPosts.getContent().stream()
            .map(this::convertPostToTrend)
            .collect(Collectors.toList());
    }

    public List<TrendDto> searchTrends(String keyword) {
        log.info("Searching trends with keyword: {}", keyword);
        
        Page<Post> searchResults = postRepository.searchPosts(keyword, Pageable.ofSize(20));
        
        return searchResults.getContent().stream()
            .map(this::convertPostToTrend)
            .collect(Collectors.toList());
    }

    private TrendDto convertPostToTrend(Post post) {
        long likes = likeRepository.countLikesByPost(post.getId());
        long comments = commentRepository.countCommentsByPost(post.getId());
        
        return TrendDto.builder()
            .id(post.getId())
            .title(extractTitleFromPost(post.getContent()))
            .description(truncateContent(post.getContent(), 150))
            .category(determineCategoryFromContent(post.getContent()))
            .posts(1L)
            .views((likes + comments) * 2)
            .time(formatTimeAgo(post.getCreatedAt()))
            .trending(likes + comments > 3)
            .build();
    }

    private HashtagDto convertToHashtagDto(Hashtag hashtag) {
        return HashtagDto.builder()
            .id(hashtag.getId())
            .name(hashtag.getName())
            .posts((long) hashtag.getUsageCount())
            .trending(hashtag.getUsageCount() > 5 ? "up" : "stable")
            .usageCount(hashtag.getUsageCount())
            .isPopular(hashtag.getUsageCount() > 10)
            .build();
    }

    private List<TrendDto> getDefaultTrends() {
        return List.of(
            TrendDto.builder()
                .id(1L)
                .title("DIU Tech Week 2024")
                .description("Students showcase innovative tech projects and startups")
                .category("Technology")
                .posts(45L)
                .views(1200L)
                .time("2 hours ago")
                .trending(true)
                .build(),
            TrendDto.builder()
                .id(2L)
                .title("Campus Programming Contest")
                .description("Annual coding competition brings together best programmers")
                .category("Programming")
                .posts(32L)
                .views(856L)
                .time("4 hours ago")
                .trending(true)
                .build(),
            TrendDto.builder()
                .id(3L)
                .title("Web Development Bootcamp")
                .description("Learn modern web technologies in intensive workshop")
                .category("Web Development")
                .posts(28L)
                .views(654L)
                .time("6 hours ago")
                .trending(true)
                .build()
        );
    }

    private List<HashtagDto> getDefaultHashtags() {
        return List.of(
            HashtagDto.builder().id(1L).name("DIUTech").posts(45L).trending("up").usageCount(45).isPopular(true).build(),
            HashtagDto.builder().id(2L).name("Programming").posts(32L).trending("up").usageCount(32).isPopular(true).build(),
            HashtagDto.builder().id(3L).name("WebDev").posts(28L).trending("up").usageCount(28).isPopular(true).build(),
            HashtagDto.builder().id(4L).name("Innovation").posts(24L).trending("stable").usageCount(24).isPopular(true).build(),
            HashtagDto.builder().id(5L).name("Students").posts(19L).trending("up").usageCount(19).isPopular(false).build()
        );
    }

    private String extractTitleFromPost(String content) {
        if (content == null) return "Trending Post";
        String[] words = content.split("\\s+");
        return String.join(" ", List.of(words).subList(0, Math.min(4, words.length))) + "...";
    }

    private String truncateContent(String content, int maxLength) {
        if (content == null) return "";
        return content.length() > maxLength ? 
            content.substring(0, maxLength) + "..." : content;
    }

    private String determineCategoryFromContent(String content) {
        if (content == null) return "General";
        
        String lowerContent = content.toLowerCase();
        if (lowerContent.contains("tech") || lowerContent.contains("technology")) return "Technology";
        if (lowerContent.contains("code") || lowerContent.contains("programming")) return "Programming";
        if (lowerContent.contains("web") || lowerContent.contains("development")) return "Web Development";
        if (lowerContent.contains("design")) return "Design";
        if (lowerContent.contains("student") || lowerContent.contains("university")) return "Academic";
        
        return "General";
    }

    private String formatTimeAgo(LocalDateTime dateTime) {
        if (dateTime == null) return "Recently";
        
        LocalDateTime now = LocalDateTime.now();
        long minutes = java.time.Duration.between(dateTime, now).toMinutes();
        
        if (minutes < 60) return minutes + " minutes ago";
        long hours = minutes / 60;
        if (hours < 24) return hours + " hours ago";
        long days = hours / 24;
        return days + " days ago";
    }
}
