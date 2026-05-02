package com.adnan.portfolio.portfolio_v2.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExperienceDto {
    private UUID id;

    @NotBlank(message = "Role is required")
    private String role;
    @NotBlank(message = "Company name is required")
    private String companyName;

    private String companyUrl;
    private String location;
    private String category;
    private List<String> technologies;
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> description;
    private String imageUrl;
}
