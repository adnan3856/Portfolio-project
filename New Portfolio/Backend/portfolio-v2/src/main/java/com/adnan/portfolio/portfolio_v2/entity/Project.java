package com.adnan.portfolio.portfolio_v2.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 255)
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String detailedDescription;

    @ElementCollection
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    private List<String> techStack;

    private String githubUrl;
    
    private String liveDemoUrl;
    
    private String imageUrl;
    
    @Column(length = 100)
    private String projectType;

    private LocalDate startDate;
    
    private LocalDate endDate;

    @Column(nullable = false)
    private boolean featured = false;

    @Column(nullable = false)
    private Integer displayOrder = 0;

    @Column(length = 50)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String architectureNotes;

    @ElementCollection
    @CollectionTable(name = "project_key_highlights", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "highlight", columnDefinition = "TEXT")
    private List<String> keyHighlights;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
