package com.adnan.portfolio.portfolio_v2.repository;

import com.adnan.portfolio.portfolio_v2.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, UUID> {
    List<Achievement> findByProfileUsernameOrderByDateDesc(String username);
}
