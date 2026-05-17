package com.adnan.portfolio.portfolio_v2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adnan.portfolio.portfolio_v2.entity.Project;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByProfile_UsernameIgnoreCaseOrderByDisplayOrderAsc(String username);

    List<Project> findByProfile_UsernameIgnoreCaseAndFeaturedTrueOrderByDisplayOrderAsc(String username);

    List<Project> findByProfile_UsernameIgnoreCaseAndProjectTypeIgnoreCaseOrderByDisplayOrderAsc(String username, String projectType);
}
