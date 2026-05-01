package com.adnan.portfolio.portfolio_v2.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Data;

@Data
public class AboutDto {
    private UUID id;
    private String name;
    private String title;
    private String workEmail;
    private String workPhone;
    private String profileImage;
    private List<String> description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
