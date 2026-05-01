package com.adnan.portfolio.portfolio_v2.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adnan.portfolio.portfolio_v2.dto.AboutDto;
import com.adnan.portfolio.portfolio_v2.entity.About;
import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.exception.ResourceAlreadyExistsException;
import com.adnan.portfolio.portfolio_v2.exception.ResourceNotFoundException;
import com.adnan.portfolio.portfolio_v2.repository.AboutRepository;
import com.adnan.portfolio.portfolio_v2.repository.ProfileRepository;
import com.adnan.portfolio.portfolio_v2.service.AboutService;

@Service
@Transactional
@RequiredArgsConstructor
public class AboutServiceImpl implements AboutService {

    private final AboutRepository aboutRepository;
    private final ProfileRepository profileRepository;

    @Override
    public AboutDto saveAbout(String username, AboutDto aboutDto) {
        Profile profile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with username: " + username));
        
        if (aboutRepository.findByProfileUsername(username).isPresent()) {
            throw new ResourceAlreadyExistsException("About section already exists for this profile. Please use the update API.");
        }

        About about = new About();
        about.setName(aboutDto.getName());
        about.setTitle(aboutDto.getTitle());
        about.setWorkEmail(aboutDto.getWorkEmail());
        about.setWorkPhone(aboutDto.getWorkPhone());
        about.setProfileImage(aboutDto.getProfileImage());
        about.setDescription(aboutDto.getDescription());
        about.setProfile(profile);

        About savedAbout = aboutRepository.save(about);
        return mapToDto(savedAbout);
    }

    @Override
    @Transactional(readOnly = true)
    public AboutDto getAboutByUsername(String username) {
        About about = aboutRepository.findByProfileUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("About information not found for username: " + username));
        return mapToDto(about);
    }

    @Override
    public AboutDto updateAbout(String username, AboutDto aboutDto) {
        About existingAbout = aboutRepository.findByProfileUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("About information not found for username: " + username));

        existingAbout.setName(aboutDto.getName());
        existingAbout.setTitle(aboutDto.getTitle());
        existingAbout.setWorkEmail(aboutDto.getWorkEmail());
        existingAbout.setWorkPhone(aboutDto.getWorkPhone());
        existingAbout.setProfileImage(aboutDto.getProfileImage());
        existingAbout.setDescription(aboutDto.getDescription());

        About updatedAbout = aboutRepository.save(existingAbout);
        return mapToDto(updatedAbout);
    }

    private AboutDto mapToDto(About about) {
        AboutDto dto = new AboutDto();
        dto.setId(about.getId());
        dto.setName(about.getName());
        dto.setTitle(about.getTitle());
        dto.setWorkEmail(about.getWorkEmail());
        dto.setWorkPhone(about.getWorkPhone());
        dto.setProfileImage(about.getProfileImage());
        dto.setDescription(about.getDescription());
        dto.setCreatedAt(about.getCreatedAt());
        dto.setUpdatedAt(about.getUpdatedAt());
        return dto;
    }
}
