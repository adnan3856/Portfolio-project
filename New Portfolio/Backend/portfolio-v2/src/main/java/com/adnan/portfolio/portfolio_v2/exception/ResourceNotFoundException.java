package com.adnan.portfolio.portfolio_v2.exception;

public class ResourceNotFoundException extends RuntimeException {

    private String profileId;

    
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
