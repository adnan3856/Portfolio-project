package com.adnan.portfolio.portfolio_v2.service;

import com.adnan.portfolio.portfolio_v2.entity.Profile;

public interface ProfileService {
    Profile saveProfile(Profile profile);
    Profile getProfileByUsername(String username);
    Profile updateProfile(String username, Profile profile);
    void deleteProfile(Long id);
    Profile getProfileByEmail(String email);
}
