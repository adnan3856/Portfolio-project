package com.adnan.portfolio.portfolio_v2.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adnan.portfolio.portfolio_v2.dto.AchievementDto;
import com.adnan.portfolio.portfolio_v2.entity.Achievement;
import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.exception.ResourceNotFoundException;
import com.adnan.portfolio.portfolio_v2.exception.UnauthorizedActionException;
import com.adnan.portfolio.portfolio_v2.repository.AchievementRepository;
import com.adnan.portfolio.portfolio_v2.repository.ProfileRepository;
import com.adnan.portfolio.portfolio_v2.service.AchievementService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AchievementServiceImpl implements AchievementService {

    private final AchievementRepository achievementRepository;
    private final ProfileRepository profileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AchievementDto> getAchievementsByUsername(String username) {
        if (!profileRepository.findByUsername(username).isPresent()) {
            throw new ResourceNotFoundException("Profile not found with username: " + username);
        }

        return achievementRepository.findByProfileUsernameOrderByDateDesc(username)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public AchievementDto saveAchievement(String username, AchievementDto achievementDto) {
        Profile profile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with username: " + username));

        Achievement achievement = new Achievement();
        mapToEntity(achievementDto, achievement);
        achievement.setProfile(profile);

        Achievement savedAchievement = achievementRepository.save(achievement);
        return mapToDto(savedAchievement);
    }

    @Override
    public AchievementDto updateAchievement(String username, UUID achievementId, AchievementDto achievementDto) {
        Achievement existingAchievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + achievementId));

        if (!existingAchievement.getProfile().getUsername().equalsIgnoreCase(username)) {
            throw new UnauthorizedActionException("You are not authorized to update this achievement.");
        }

        mapToEntity(achievementDto, existingAchievement);
        Achievement updatedAchievement = achievementRepository.save(existingAchievement);
        return mapToDto(updatedAchievement);
    }

    @Override
    public void deleteAchievement(String username, UUID achievementId) {
        Achievement existingAchievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + achievementId));

        if (!existingAchievement.getProfile().getUsername().equalsIgnoreCase(username)) {
            throw new UnauthorizedActionException("You are not authorized to delete this achievement.");
        }

        achievementRepository.delete(existingAchievement);
    }

    private void mapToEntity(AchievementDto dto, Achievement entity) {
        entity.setTitle(dto.getTitle());
        entity.setIssuer(dto.getIssuer());
        entity.setDescription(dto.getDescription());
        entity.setDate(dto.getDate());
        entity.setImageUrl(dto.getImageUrl());
        entity.setLink(dto.getLink());
    }

    private AchievementDto mapToDto(Achievement entity) {
        AchievementDto dto = new AchievementDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setIssuer(entity.getIssuer());
        dto.setDescription(entity.getDescription());
        dto.setDate(entity.getDate());
        dto.setImageUrl(entity.getImageUrl());
        dto.setLink(entity.getLink());
        return dto;
    }
}
