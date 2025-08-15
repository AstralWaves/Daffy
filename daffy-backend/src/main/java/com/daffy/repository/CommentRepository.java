package com.daffy.repository;

import com.daffy.entity.Comment;
import com.daffy.entity.Post;
import com.daffy.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    Page<Comment> findByPostOrderByCreatedAtAsc(Post post, Pageable pageable);
    Page<Comment> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    
    @Query("SELECT c FROM Comment c WHERE c.post.id = :postId AND c.parentComment IS NULL ORDER BY c.createdAt ASC")
    Page<Comment> findTopLevelCommentsByPost(@Param("postId") Long postId, Pageable pageable);
    
    @Query("SELECT c FROM Comment c WHERE c.parentComment.id = :parentId ORDER BY c.createdAt ASC")
    List<Comment> findRepliesByParentComment(@Param("parentId") Long parentId);
    
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post.id = :postId AND c.isDeleted = false")
    long countCommentsByPost(@Param("postId") Long postId);
    
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.user.id = :userId AND c.isDeleted = false")
    long countCommentsByUser(@Param("userId") Long userId);
}