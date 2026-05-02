package com.adnan.portfolio.portfolio_v2.repository;

import com.adnan.portfolio.portfolio_v2.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    // Fetches newest messages first
    List<Message> findByProfileUsernameOrderByCreatedAtDesc(String username);
}
