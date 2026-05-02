package com.adnan.portfolio.portfolio_v2.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MessageDto {
    private UUID id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    private String subject;
    @NotBlank(message = "Message body cannot be empty")
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;
}
