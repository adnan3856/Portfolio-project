package com.adnan.portfolio.portfolio_v2.service.serviceImpl;

import org.springframework.stereotype.Service;

import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.repository.ProfileRepository;
import com.adnan.portfolio.portfolio_v2.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public Profile getProfileByUsername(String username) {
        return profileRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Profile not found with username: " + username));
    }

    @Override
    public Profile updateProfile(String username, Profile profile) {
        Profile existingProfile = getProfileByUsername(username);
        existingProfile.setEmail(profile.getEmail());
        existingProfile.setFullName(profile.getFullName());
        existingProfile.setBio(profile.getBio());
        existingProfile.setResumeUrl(profile.getResumeUrl());
        existingProfile.setGithubUrl(profile.getGithubUrl());
        existingProfile.setLinkedinUrl(profile.getLinkedinUrl());
        // existingProfile.setId(existingProfile.getId());
        existingProfile.setPortfolioUrl(profile.getPortfolioUrl());
        existingProfile.setPhone(profile.getPhone());
        existingProfile.setUsername(profile.getUsername());
        return profileRepository.save(existingProfile);
    }

    @Override
    public void deleteProfile(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteProfile'");
    }

    @Override
    public Profile getProfileByEmail(String email) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getProfileByEmail'");
    }
    
}

