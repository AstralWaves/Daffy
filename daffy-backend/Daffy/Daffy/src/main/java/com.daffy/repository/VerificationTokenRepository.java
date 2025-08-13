package com.daffy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daffy.entity.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);
}