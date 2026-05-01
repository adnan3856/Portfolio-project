package com.adnan.portfolio.portfolio_v2.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adnan.portfolio.portfolio_v2.dto.ProfileDto;
import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.exception.ResourceNotFoundException;
import com.adnan.portfolio.portfolio_v2.repository.ProfileRepository;
import com.adnan.portfolio.portfolio_v2.service.ProfileService;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    @Override
    public ProfileDto saveProfile(ProfileDto profileDto) {
        Profile profile = mapToEntity(profileDto);
        Profile savedProfile = profileRepository.save(profile);
        return mapToDto(savedProfile);
    }

    @Override
    @Transactional(readOnly = true)
    public ProfileDto getProfileByUsername(String username) {
        Profile profile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with username: " + username));
        return mapToDto(profile);
    }

    @Override
    public ProfileDto updateProfile(String username, ProfileDto profileDto) {
        Profile existingProfile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with username: " + username));

        // Manually map fields from the incoming profile to the existing one
        existingProfile.setUsername(profileDto.getUsername());
        existingProfile.setFullName(profileDto.getFullName());
        existingProfile.setBio(profileDto.getBio());
        existingProfile.setResumeUrl(profileDto.getResumeUrl());
        existingProfile.setGithubUrl(profileDto.getGithubUrl());
        existingProfile.setLinkedinUrl(profileDto.getLinkedinUrl());
        existingProfile.setPortfolioUrl(profileDto.getPortfolioUrl());
        existingProfile.setEmail(profileDto.getEmail());
        existingProfile.setPhone(profileDto.getPhone());

        Profile updatedProfile = profileRepository.save(existingProfile);
        return mapToDto(updatedProfile);
    }

    @Override
    public void deleteProfile(UUID id) {
        if (!profileRepository.existsById(id)) {
            throw new ResourceNotFoundException("Profile not found with id: " + id);
        }
        profileRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProfileDto getProfileByEmail(String email) {
        Profile profile = profileRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with email: " + email));
        return mapToDto(profile);
    }

    private Profile mapToEntity(ProfileDto dto) {
        Profile profile = new Profile();
        profile.setUsername(dto.getUsername());
        profile.setFullName(dto.getFullName());
        profile.setBio(dto.getBio());
        profile.setResumeUrl(dto.getResumeUrl());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setPortfolioUrl(dto.getPortfolioUrl());
        profile.setEmail(dto.getEmail());
        profile.setPhone(dto.getPhone());
        return profile;
    }

    private ProfileDto mapToDto(Profile profile) {
        ProfileDto dto = new ProfileDto();
        dto.setId(profile.getId());
        dto.setUsername(profile.getUsername());
        dto.setFullName(profile.getFullName());
        dto.setBio(profile.getBio());
        dto.setResumeUrl(profile.getResumeUrl());
        dto.setGithubUrl(profile.getGithubUrl());
        dto.setLinkedinUrl(profile.getLinkedinUrl());
        dto.setPortfolioUrl(profile.getPortfolioUrl());
        dto.setEmail(profile.getEmail());
        dto.setPhone(profile.getPhone());
        dto.setCreatedAt(profile.getCreatedAt());
        dto.setUpdatedAt(profile.getUpdatedAt());
        return dto;
    }
}