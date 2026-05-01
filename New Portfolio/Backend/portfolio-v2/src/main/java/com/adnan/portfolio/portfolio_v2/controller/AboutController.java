package com.adnan.portfolio.portfolio_v2.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adnan.portfolio.portfolio_v2.dto.AboutDto;
import com.adnan.portfolio.portfolio_v2.service.AboutService;

@RestController
@RequestMapping("/api/about")
@RequiredArgsConstructor
public class AboutController {
    private final AboutService aboutService;

    @PostMapping("/save/{username}")
    public ResponseEntity<AboutDto> saveAbout(@PathVariable String username, @RequestBody AboutDto aboutDto) {
        AboutDto savedAbout = aboutService.saveAbout(username, aboutDto);
        return ResponseEntity.ok(savedAbout);
    }

    @GetMapping("/{username}")
    public ResponseEntity<AboutDto> getAboutByUsername(@PathVariable String username) {
        return ResponseEntity.ok(aboutService.getAboutByUsername(username));
    }

    @PostMapping("/update/{username}")
    public ResponseEntity<AboutDto> updateAbout(@PathVariable String username, @RequestBody AboutDto aboutDto) {
        AboutDto updatedAbout = aboutService.updateAbout(username, aboutDto);
        return ResponseEntity.ok(updatedAbout);
    }
}
