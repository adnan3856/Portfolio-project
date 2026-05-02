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

import com.adnan.portfolio.portfolio_v2.dto.SkillDto;
import com.adnan.portfolio.portfolio_v2.service.SkillService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SkillController {
    private final SkillService skillService;

    @GetMapping("/{username}")
    public ResponseEntity<List<SkillDto>> getSkills(@PathVariable String username) {
        return ResponseEntity.ok(skillService.getSkillsByUsername(username));
    }

    @PostMapping("/save/{username}")
    public ResponseEntity<SkillDto> saveSkill(@PathVariable String username, @Valid @RequestBody SkillDto skillDto) {
        return ResponseEntity.ok(skillService.saveSkill(username, skillDto));
    }

    @PutMapping("/update/{username}/{skillId}")
    public ResponseEntity<SkillDto> updateSkill(@PathVariable String username, @PathVariable UUID skillId, @Valid @RequestBody SkillDto skillDto) {
        return ResponseEntity.ok(skillService.updateSkill(username, skillId, skillDto));
    }

    @DeleteMapping("/{username}/{skillId}")
    public ResponseEntity<Void> deleteSkill(@PathVariable String username, @PathVariable UUID skillId) {
        skillService.deleteSkill(username, skillId);
        return ResponseEntity.ok().build();
    }
}
