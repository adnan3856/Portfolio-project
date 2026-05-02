package com.adnan.portfolio.portfolio_v2.service;

import com.adnan.portfolio.portfolio_v2.dto.ExperienceDto;
import java.util.List;
import java.util.UUID;

public interface ExperienceService {
    List<ExperienceDto> getExperiencesByUsername(String username);
    ExperienceDto saveExperience(String username, ExperienceDto experienceDto);
    ExperienceDto updateExperience(String username, UUID experienceId, ExperienceDto experienceDto);
    void deleteExperience(String username, UUID experienceId);
}
