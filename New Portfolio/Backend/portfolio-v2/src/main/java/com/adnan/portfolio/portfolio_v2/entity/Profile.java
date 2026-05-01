package com.adnan.portfolio.portfolio_v2.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, length = 100)
    private String fullName;
    
    @Column(nullable = false, length = 500)
    private String bio;
    
    @Column(length = 500)
    private String resumeUrl;
    
    @Column(length = 200)
    private String githubUrl;
    
    @Column(length = 200)
    private String linkedinUrl;
    
    @Column(length = 200)
    private String portfolioUrl;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(length = 20)
    private String phone;
    
    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column
    @UpdateTimestamp
    private LocalDateTime updatedAt;
   
    
}