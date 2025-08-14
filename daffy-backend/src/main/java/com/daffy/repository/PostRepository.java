package com.daffy.repository;

import com.daffy.entity.Post;
import com.daffy.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    Page<Post> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    Page<Post> findByClubOrderByCreatedAtDesc(Long clubId, Pageable pageable);
    
    @Query("SELECT p FROM Post p WHERE p.status = 'PUBLISHED' AND p.isPublic = true ORDER BY p.createdAt DESC")
    Page<Post> findPublicPosts(Pageable pageable);
    
    @Query("SELECT p FROM Post p WHERE p.user IN :users AND p.status = 'PUBLISHED' AND p.isPublic = true ORDER BY p.createdAt DESC")
    Page<Post> findPostsByUsers(@Param("users") List<User> users, Pageable pageable);
    
    @Query("SELECT p FROM Post p WHERE p.content LIKE %:keyword% AND p.status = 'PUBLISHED' AND p.isPublic = true")
    Page<Post> searchPosts(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT p FROM Post p WHERE p.createdAt >= :startDate AND p.status = 'PUBLISHED' ORDER BY p.createdAt DESC")
    Page<Post> findRecentPosts(@Param("startDate") LocalDateTime startDate, Pageable pageable);
    
    @Query("SELECT p FROM Post p WHERE p.user.id = :userId AND p.status = 'PUBLISHED' ORDER BY p.createdAt DESC")
    Page<Post> findUserPosts(@Param("userId") Long userId, Pageable pageable);
    
    @Query("SELECT COUNT(p) FROM Post p WHERE p.user.id = :userId AND p.status = 'PUBLISHED'")
    long countUserPosts(@Param("userId") Long userId);
    
    @Query("SELECT p FROM Post p WHERE p.status = 'PUBLISHED' ORDER BY (SELECT COUNT(l) FROM Like l WHERE l.post = p) DESC")
    Page<Post> findTrendingPosts(Pageable pageable);
}
