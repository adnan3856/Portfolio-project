package com.adnan.portfolio.portfolio_v2.dto;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AchievementDto {
    private UUID id;

    @NotBlank(message = "Title is required")
    private String title;
    private String issuer;
    private String description;
    private LocalDate date;
    private String imageUrl;
    private String link;
}
