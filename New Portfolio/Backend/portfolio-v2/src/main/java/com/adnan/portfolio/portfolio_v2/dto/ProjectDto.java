package com.adnan.portfolio.portfolio_v2.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class ProjectDto {

    private UUID id;

    // Included so the frontend knows who this project belongs to
    private String username;

    @NotBlank(message = "Project title is required")
    private String title;

    @NotBlank(message = "Short description is required")
    private String shortDescription;

    private String detailedDescription;

    @NotEmpty(message = "At least one technology must be specified in the tech stack")
    private List<String> techStack;

    private String githubUrl;
    
    private String liveDemoUrl;
    
    private String imageUrl;
    
    private String projectType;

    private LocalDate startDate;
    
    private LocalDate endDate;

    private boolean featured;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    private String status;

    private String architectureNotes;

    private List<String> keyHighlights;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
