package com.adnan.portfolio.portfolio_v2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.service.ProfileService;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {
    
    private ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/save")
    public ResponseEntity<Profile> saveProfile(@RequestBody Profile profile) {
        Profile savedProfile = profileService.saveProfile(profile);
        return ResponseEntity.ok(savedProfile);
    }
    
    @GetMapping("/{username}")
    public ResponseEntity<Profile> getProfileByUsername(@PathVariable String username) {
        Profile profile = profileService.getProfileByUsername(username);
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/update/{username}")
    public ResponseEntity<Profile> updateProfile(@PathVariable String username, @RequestBody Profile profile) {
        Profile updatedProfile = profileService.updateProfile(username, profile);
        return ResponseEntity.ok(updatedProfile);
    }


}
