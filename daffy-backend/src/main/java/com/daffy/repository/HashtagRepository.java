package com.daffy.repository;

import com.daffy.entity.Hashtag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    
    Optional<Hashtag> findByName(String name);
    
    @Query("SELECT h FROM Hashtag h ORDER BY h.usageCount DESC")
    List<Hashtag> findTopHashtagsByUsage(Pageable pageable);
    
    @Query("SELECT h FROM Hashtag h WHERE h.usageCount > :threshold ORDER BY h.usageCount DESC")
    List<Hashtag> findTrendingHashtags(int threshold, Pageable pageable);
}