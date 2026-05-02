package com.adnan.portfolio.portfolio_v2.dto;

import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SkillDto {
    private UUID id;
    
    @NotBlank(message = "Skill name is required")
    private String name;
    
    private String category;
    
    @Min(value = 0, message = "Percentage cannot be less than 0")
    @Max(value = 100, message = "Percentage cannot be greater than 100")
    private Integer percentage;
    
    private String proficiency;
    private String iconUrl;
    
    @NotNull(message = "Priority is required for sorting")
    private Integer priority;
}