package com.adnan.portfolio.portfolio_v2.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adnan.portfolio.portfolio_v2.dto.ContactDto;
import com.adnan.portfolio.portfolio_v2.dto.MessageDto;
import com.adnan.portfolio.portfolio_v2.service.ContactService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {
    private final ContactService contactService;

    // === Contact Info Endpoints ===
    @GetMapping("/{username}")
    public ResponseEntity<ContactDto> getContactInfo(@PathVariable String username) {
        return ResponseEntity.ok(contactService.getContactByUsername(username));
    }

    @PostMapping("/save/{username}")
    public ResponseEntity<ContactDto> saveContactInfo(@PathVariable String username, @Valid @RequestBody ContactDto contactDto) {
        return ResponseEntity.ok(contactService.saveOrUpdateContact(username, contactDto));
    }

    // === Messaging Endpoints ===
    @PostMapping("/{username}/message")
    public ResponseEntity<MessageDto> sendMessage(@PathVariable String username, @Valid @RequestBody MessageDto messageDto) {
        return ResponseEntity.ok(contactService.sendMessage(username, messageDto));
    }

    // Used by the portfolio owner to read their inbox
    @GetMapping("/{username}/messages")
    public ResponseEntity<List<MessageDto>> getInboxMessages(@PathVariable String username) {
        return ResponseEntity.ok(contactService.getMessagesByUsername(username));
    }

    @PatchMapping("/{username}/messages/{messageId}/read")
    public ResponseEntity<MessageDto> markAsRead(@PathVariable String username, @PathVariable UUID messageId) {
        return ResponseEntity.ok(contactService.markMessageAsRead(username, messageId));
    }

    @DeleteMapping("/{username}/messages/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String username, @PathVariable UUID messageId) {
        contactService.deleteMessage(username, messageId);
        return ResponseEntity.ok().build();
    }
}
