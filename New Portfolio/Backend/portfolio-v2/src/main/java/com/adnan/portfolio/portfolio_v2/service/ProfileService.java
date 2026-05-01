package com.adnan.portfolio.portfolio_v2.service;

import com.adnan.portfolio.portfolio_v2.dto.ProfileDto;

import java.util.UUID;

public interface ProfileService {
    ProfileDto saveProfile(ProfileDto profileDto);
    ProfileDto getProfileByUsername(String username);
    ProfileDto updateProfile(String username, ProfileDto profileDto);
    void deleteProfile(UUID id);
    ProfileDto getProfileByEmail(String email);
}
