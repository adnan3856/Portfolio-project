package com.adnan.portfolio.portfolio_v2.repository;

import com.adnan.portfolio.portfolio_v2.entity.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AboutRepository extends JpaRepository<About, UUID> {
    Optional<About> findByProfileUsername(String username);
}
