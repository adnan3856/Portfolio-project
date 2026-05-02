package com.adnan.portfolio.portfolio_v2.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adnan.portfolio.portfolio_v2.dto.AchievementDto;
import com.adnan.portfolio.portfolio_v2.service.AchievementService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AchievementController {
    private final AchievementService achievementService;

    @GetMapping("/{username}")
    public ResponseEntity<List<AchievementDto>> getAchievements(@PathVariable String username) {
        return ResponseEntity.ok(achievementService.getAchievementsByUsername(username));
    }

    @PostMapping("/save/{username}")
    public ResponseEntity<AchievementDto> saveAchievement(@PathVariable String username,
            @Valid @RequestBody AchievementDto achievementDto) {
        return ResponseEntity.ok(achievementService.saveAchievement(username, achievementDto));
    }

    @PutMapping("/update/{username}/{achievementId}")
    public ResponseEntity<AchievementDto> updateAchievement(@PathVariable String username,
            @PathVariable UUID achievementId, @Valid @RequestBody AchievementDto achievementDto) {
        return ResponseEntity.ok(achievementService.updateAchievement(username, achievementId, achievementDto));
    }

    @DeleteMapping("/{username}/{achievementId}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable String username, @PathVariable UUID achievementId) {
        achievementService.deleteAchievement(username, achievementId);
        return ResponseEntity.ok().build();
    }
}
