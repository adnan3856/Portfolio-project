package com.adnan.portfolio.portfolio_v2.dto;

import java.util.Map;
import java.util.UUID;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class ContactDto {
    private UUID id;
    
    private String location;
    private String phone;
    
    @Email(message = "Please provide a valid email address")
    private String email;
    private String linkedin;
    private String github;
    private String facebook;
    private String instagram;
    private Map<String, String> otherLinks;
}
