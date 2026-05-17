package com.adnan.portfolio.portfolio_v2.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adnan.portfolio.portfolio_v2.dto.ProjectDto;
import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.entity.Project;
import com.adnan.portfolio.portfolio_v2.exception.ResourceNotFoundException;
import com.adnan.portfolio.portfolio_v2.repository.ProfileRepository;
import com.adnan.portfolio.portfolio_v2.repository.ProjectRepository;
import com.adnan.portfolio.portfolio_v2.service.ProjectService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProfileRepository profileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> getProjectsByUsername(String username, Boolean featured, String type) {
        List<Project> projects;
        
        if (featured != null && featured) {
            projects = projectRepository.findByProfile_UsernameIgnoreCaseAndFeaturedTrueOrderByDisplayOrderAsc(username);
        } else if (type != null && !type.isBlank()) {
            projects = projectRepository.findByProfile_UsernameIgnoreCaseAndProjectTypeIgnoreCaseOrderByDisplayOrderAsc(username, type);
        } else {
            projects = projectRepository.findByProfile_UsernameIgnoreCaseOrderByDisplayOrderAsc(username);
        }
        
        return projects.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDto getProjectById(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return mapToDto(project);
    }

    @Override
    @Transactional
    public ProjectDto createProject(String username, ProjectDto projectDto) {
        Profile profile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for username: " + username));

        Project project = new Project();
        project.setProfile(profile);
        updateEntityFromDto(project, projectDto);

        Project savedProject = projectRepository.save(project);
        return mapToDto(savedProject);
    }

    @Override
    @Transactional
    public ProjectDto updateProject(UUID id, ProjectDto projectDto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        updateEntityFromDto(project, projectDto);
        Project updatedProject = projectRepository.save(project);
        
        return mapToDto(updatedProject);
    }

    @Override
    @Transactional
    public void deleteProject(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        projectRepository.delete(project);
    }

    private void updateEntityFromDto(Project project, ProjectDto dto) {
        project.setTitle(dto.getTitle());
        project.setShortDescription(dto.getShortDescription());
        project.setDetailedDescription(dto.getDetailedDescription());
        project.setTechStack(dto.getTechStack());
        project.setGithubUrl(dto.getGithubUrl());
        project.setLiveDemoUrl(dto.getLiveDemoUrl());
        project.setImageUrl(dto.getImageUrl());
        project.setProjectType(dto.getProjectType());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setFeatured(dto.isFeatured());
        project.setDisplayOrder(dto.getDisplayOrder());
        project.setStatus(dto.getStatus());
        project.setArchitectureNotes(dto.getArchitectureNotes());
        project.setKeyHighlights(dto.getKeyHighlights());
    }

    private ProjectDto mapToDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setId(project.getId());
        dto.setUsername(project.getProfile().getUsername());
        dto.setCreatedAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());
        
        return mapToDtoManual(project, dto);
    }
    
    private ProjectDto mapToDtoManual(Project project, ProjectDto dto) {
        dto.setTitle(project.getTitle());
        dto.setShortDescription(project.getShortDescription());
        dto.setDetailedDescription(project.getDetailedDescription());
        dto.setTechStack(project.getTechStack());
        dto.setGithubUrl(project.getGithubUrl());
        dto.setLiveDemoUrl(project.getLiveDemoUrl());
        dto.setImageUrl(project.getImageUrl());
        dto.setProjectType(project.getProjectType());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setFeatured(project.isFeatured());
        dto.setDisplayOrder(project.getDisplayOrder());
        dto.setStatus(project.getStatus());
        dto.setArchitectureNotes(project.getArchitectureNotes());
        dto.setKeyHighlights(project.getKeyHighlights());
        return dto;
    }
}
