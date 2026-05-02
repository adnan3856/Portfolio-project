package com.adnan.portfolio.portfolio_v2.service;

import com.adnan.portfolio.portfolio_v2.dto.AchievementDto;
import java.util.List;
import java.util.UUID;

public interface AchievementService {
    List<AchievementDto> getAchievementsByUsername(String username);

    AchievementDto saveAchievement(String username, AchievementDto achievementDto);

    AchievementDto updateAchievement(String username, UUID achievementId, AchievementDto achievementDto);

    void deleteAchievement(String username, UUID achievementId);
}
