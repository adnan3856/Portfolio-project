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

import com.adnan.portfolio.portfolio_v2.dto.ExperienceDto;
import com.adnan.portfolio.portfolio_v2.service.ExperienceService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/experience")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExperienceController {
    private final ExperienceService experienceService;

    @GetMapping("/{username}")
    public ResponseEntity<List<ExperienceDto>> getExperiences(@PathVariable String username) {
        return ResponseEntity.ok(experienceService.getExperiencesByUsername(username));
    }

    @PostMapping("/save/{username}")
    public ResponseEntity<ExperienceDto> saveExperience(@PathVariable String username, @Valid @RequestBody ExperienceDto experienceDto) {
        return ResponseEntity.ok(experienceService.saveExperience(username, experienceDto));
    }

    @PutMapping("/update/{username}/{experienceId}")
    public ResponseEntity<ExperienceDto> updateExperience(@PathVariable String username, @PathVariable UUID experienceId, @Valid @RequestBody ExperienceDto experienceDto) {
        return ResponseEntity.ok(experienceService.updateExperience(username, experienceId, experienceDto));
    }

    @DeleteMapping("/{username}/{experienceId}")
    public ResponseEntity<Void> deleteExperience(@PathVariable String username, @PathVariable UUID experienceId) {
        experienceService.deleteExperience(username, experienceId);
        return ResponseEntity.ok().build();
    }
}
