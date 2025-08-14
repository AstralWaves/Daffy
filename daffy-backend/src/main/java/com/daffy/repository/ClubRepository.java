package com.daffy.repository;

import com.daffy.entity.Club;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    
    Page<Club> findByType(Club.ClubType type, Pageable pageable);
    Page<Club> findByPrivacy(Club.ClubPrivacy privacy, Pageable pageable);
    
    @Query("SELECT c FROM Club c WHERE c.status = 'ACTIVE' AND c.isActive = true")
    Page<Club> findActiveClubs(Pageable pageable);
    
    @Query("SELECT c FROM Club c WHERE c.name LIKE %:keyword% OR c.description LIKE %:keyword%")
    Page<Club> searchClubs(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT c FROM Club c WHERE c.owner.id = :ownerId")
    Page<Club> findByOwner(@Param("ownerId") Long ownerId, Pageable pageable);
    
    @Query("SELECT c FROM Club c JOIN c.members m WHERE m.id = :userId")
    Page<Club> findByMember(@Param("userId") Long userId, Pageable pageable);
    
    @Query("SELECT c FROM Club c ORDER BY (SELECT COUNT(m) FROM User m JOIN m.clubs mc WHERE mc = c) DESC")
    Page<Club> findPopularClubs(Pageable pageable);
    
    @Query("SELECT COUNT(c) FROM Club c WHERE c.type = :type")
    long countByType(@Param("type") Club.ClubType type);
}
