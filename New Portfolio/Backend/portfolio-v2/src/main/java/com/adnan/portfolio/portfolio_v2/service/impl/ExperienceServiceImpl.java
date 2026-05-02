package com.adnan.portfolio.portfolio_v2.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adnan.portfolio.portfolio_v2.dto.ExperienceDto;
import com.adnan.portfolio.portfolio_v2.entity.Experience;
import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.exception.ResourceNotFoundException;
import com.adnan.portfolio.portfolio_v2.exception.UnauthorizedActionException;
import com.adnan.portfolio.portfolio_v2.repository.ExperienceRepository;
import com.adnan.portfolio.portfolio_v2.repository.ProfileRepository;
import com.adnan.portfolio.portfolio_v2.service.ExperienceService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final ProfileRepository profileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ExperienceDto> getExperiencesByUsername(String username) {
        if (!profileRepository.findByUsername(username).isPresent()) {
            throw new ResourceNotFoundException("Profile not found with username: " + username);
        }

        return experienceRepository.findByProfileUsernameOrderByStartDateDesc(username)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ExperienceDto saveExperience(String username, ExperienceDto experienceDto) {
        Profile profile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with username: " + username));

        Experience experience = new Experience();
        mapToEntity(experienceDto, experience);
        experience.setProfile(profile);

        Experience savedExperience = experienceRepository.save(experience);
        return mapToDto(savedExperience);
    }

    @Override
    public ExperienceDto updateExperience(String username, UUID experienceId, ExperienceDto experienceDto) {
        Experience existingExperience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + experienceId));

        if (!existingExperience.getProfile().getUsername().equalsIgnoreCase(username)) {
            throw new UnauthorizedActionException("You are not authorized to update this experience.");
        }

        mapToEntity(experienceDto, existingExperience);
        Experience updatedExperience = experienceRepository.save(existingExperience);
        return mapToDto(updatedExperience);
    }

    @Override
    public void deleteExperience(String username, UUID experienceId) {
        Experience existingExperience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + experienceId));

        if (!existingExperience.getProfile().getUsername().equalsIgnoreCase(username)) {
            throw new UnauthorizedActionException("You are not authorized to delete this experience.");
        }
        
        experienceRepository.delete(existingExperience);
    }

    private void mapToEntity(ExperienceDto dto, Experience entity) {
        entity.setRole(dto.getRole());
        entity.setCompanyName(dto.getCompanyName());
        entity.setCompanyUrl(dto.getCompanyUrl());
        entity.setLocation(dto.getLocation());
        entity.setCategory(dto.getCategory());
        entity.setTechnologies(dto.getTechnologies());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setDescription(dto.getDescription());
        entity.setImageUrl(dto.getImageUrl());
    }

    private ExperienceDto mapToDto(Experience entity) {
        ExperienceDto dto = new ExperienceDto();
        dto.setId(entity.getId());
        dto.setRole(entity.getRole());
        dto.setCompanyName(entity.getCompanyName());
        dto.setCompanyUrl(entity.getCompanyUrl());
        dto.setLocation(entity.getLocation());
        dto.setCategory(entity.getCategory());
        dto.setTechnologies(entity.getTechnologies());
        dto.setStartDate(entity.getStartDate());
        dto.setEndDate(entity.getEndDate());
        dto.setDescription(entity.getDescription());
        dto.setImageUrl(entity.getImageUrl());
        return dto;
    }
}
