package com.adnan.portfolio.portfolio_v2.service;

import java.util.List;
import java.util.UUID;

import com.adnan.portfolio.portfolio_v2.dto.ProjectDto;

public interface ProjectService {
    
    List<ProjectDto> getProjectsByUsername(String username, Boolean featured, String type);
    
    ProjectDto getProjectById(UUID id);
    
    ProjectDto createProject(String username, ProjectDto projectDto);
    
    ProjectDto updateProject(UUID id, ProjectDto projectDto);
    
    void deleteProject(UUID id);
    
}
