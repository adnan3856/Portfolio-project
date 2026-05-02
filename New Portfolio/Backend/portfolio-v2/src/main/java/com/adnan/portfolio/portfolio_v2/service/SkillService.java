package com.adnan.portfolio.portfolio_v2.service;

import com.adnan.portfolio.portfolio_v2.dto.SkillDto;
import java.util.List;
import java.util.UUID;

public interface SkillService {
    List<SkillDto> getSkillsByUsername(String username);
    SkillDto saveSkill(String username, SkillDto skillDto);
    SkillDto updateSkill(String username, UUID skillId, SkillDto skillDto);
    void deleteSkill(String username, UUID skillId);
}