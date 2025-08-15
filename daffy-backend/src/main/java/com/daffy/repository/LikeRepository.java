package com.daffy.repository;

import com.daffy.entity.Like;
import com.daffy.entity.Post;
import com.daffy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    
    Optional<Like> findByUserAndPost(User user, Post post);
    List<Like> findByPost(Post post);
    List<Like> findByUser(User user);
    
    @Query("SELECT COUNT(l) FROM Like l WHERE l.post.id = :postId")
    long countLikesByPost(@Param("postId") Long postId);
    
    @Query("SELECT COUNT(l) FROM Like l WHERE l.user.id = :userId")
    long countLikesByUser(@Param("userId") Long userId);
    
    @Query("SELECT l FROM Like l WHERE l.post.id = :postId AND l.type = :type")
    List<Like> findByPostAndType(@Param("postId") Long postId, @Param("type") Like.LikeType type);
    
    boolean existsByUserAndPost(User user, Post post);
    
    void deleteByUserAndPost(User user, Post post);
}