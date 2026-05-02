package com.adnan.portfolio.portfolio_v2.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adnan.portfolio.portfolio_v2.dto.SkillDto;
import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.entity.Skill;
import com.adnan.portfolio.portfolio_v2.exception.ResourceNotFoundException;
import com.adnan.portfolio.portfolio_v2.exception.UnauthorizedActionException;
import com.adnan.portfolio.portfolio_v2.repository.ProfileRepository;
import com.adnan.portfolio.portfolio_v2.repository.SkillRepository;
import com.adnan.portfolio.portfolio_v2.service.SkillService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final ProfileRepository profileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SkillDto> getSkillsByUsername(String username) {
        if (!profileRepository.findByUsername(username).isPresent()) {
            throw new ResourceNotFoundException("Profile not found with username: " + username);
        }

        return skillRepository.findByProfileUsernameOrderByPriorityAsc(username)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public SkillDto saveSkill(String username, SkillDto skillDto) {
        Profile profile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with username: " + username));

        Skill skill = new Skill();
        skill.setName(skillDto.getName());
        skill.setCategory(skillDto.getCategory());
        skill.setPercentage(skillDto.getPercentage());
        skill.setProficiency(skillDto.getProficiency());
        skill.setIconUrl(skillDto.getIconUrl());
        skill.setPriority(skillDto.getPriority());
        skill.setProfile(profile);

        Skill savedSkill = skillRepository.save(skill);
        return mapToDto(savedSkill);
    }

    @Override
    public SkillDto updateSkill(String username, UUID skillId, SkillDto skillDto) {
        Skill existingSkill = skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + skillId));

        if (!existingSkill.getProfile().getUsername().equalsIgnoreCase(username)) {
            throw new UnauthorizedActionException("You are not authorized to update this skill.");
        }

        existingSkill.setName(skillDto.getName());
        existingSkill.setCategory(skillDto.getCategory());
        existingSkill.setPercentage(skillDto.getPercentage());
        existingSkill.setProficiency(skillDto.getProficiency());
        existingSkill.setIconUrl(skillDto.getIconUrl());
        existingSkill.setPriority(skillDto.getPriority());

        Skill updatedSkill = skillRepository.save(existingSkill);
        return mapToDto(updatedSkill);
    }

    @Override
    public void deleteSkill(String username, UUID skillId) {
        Skill existingSkill = skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + skillId));

        if (!existingSkill.getProfile().getUsername().equalsIgnoreCase(username)) {
            throw new UnauthorizedActionException("You are not authorized to delete this skill.");
        }
        
        skillRepository.delete(existingSkill);
    }

    private SkillDto mapToDto(Skill entity) {
        SkillDto dto = new SkillDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCategory(entity.getCategory());
        dto.setPercentage(entity.getPercentage());
        dto.setProficiency(entity.getProficiency());
        dto.setIconUrl(entity.getIconUrl());
        dto.setPriority(entity.getPriority());
        return dto;
    }
}