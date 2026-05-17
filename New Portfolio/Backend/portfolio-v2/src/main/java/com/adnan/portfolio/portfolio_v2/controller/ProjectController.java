package com.adnan.portfolio.portfolio_v2.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adnan.portfolio.portfolio_v2.dto.ProjectDto;
import com.adnan.portfolio.portfolio_v2.service.ProjectService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/{username}")
    public ResponseEntity<List<ProjectDto>> getProjects(
            @PathVariable String username,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) String type) {
        return ResponseEntity.ok(projectService.getProjectsByUsername(username, featured, type));
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping("/save/{username}")
    public ResponseEntity<ProjectDto> createProject(
            @PathVariable String username,
            @Valid @RequestBody ProjectDto projectDto) {
        return ResponseEntity.ok(projectService.createProject(username, projectDto));
    }

    @PutMapping("/update/{username}/{projectId}")
    public ResponseEntity<ProjectDto> updateProject(
            @PathVariable String username,
            @PathVariable UUID projectId,
            @Valid @RequestBody ProjectDto projectDto) {
        return ResponseEntity.ok(projectService.updateProject(projectId, projectDto));
    }

    @DeleteMapping("/{username}/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable String username, @PathVariable UUID projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok().build();
    }
}
