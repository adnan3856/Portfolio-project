package com.adnan.portfolio.portfolio_v2.repository;

import com.adnan.portfolio.portfolio_v2.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, UUID> {
    // Fetches the experiences ordered by the newest job first
    List<Experience> findByProfileUsernameOrderByStartDateDesc(String username);
}
