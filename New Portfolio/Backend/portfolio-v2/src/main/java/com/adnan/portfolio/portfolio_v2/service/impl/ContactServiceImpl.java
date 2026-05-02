package com.adnan.portfolio.portfolio_v2.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adnan.portfolio.portfolio_v2.dto.ContactDto;
import com.adnan.portfolio.portfolio_v2.dto.MessageDto;
import com.adnan.portfolio.portfolio_v2.entity.Contact;
import com.adnan.portfolio.portfolio_v2.entity.Message;
import com.adnan.portfolio.portfolio_v2.entity.Profile;
import com.adnan.portfolio.portfolio_v2.exception.ResourceNotFoundException;
import com.adnan.portfolio.portfolio_v2.exception.UnauthorizedActionException;
import com.adnan.portfolio.portfolio_v2.repository.ContactRepository;
import com.adnan.portfolio.portfolio_v2.repository.MessageRepository;
import com.adnan.portfolio.portfolio_v2.repository.ProfileRepository;
import com.adnan.portfolio.portfolio_v2.service.ContactService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final MessageRepository messageRepository;
    private final ProfileRepository profileRepository;

    @Override
    @Transactional(readOnly = true)
    public ContactDto getContactByUsername(String username) {
        Contact contact = contactRepository.findByProfileUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Contact info not found for user: " + username));
        return mapToContactDto(contact);
    }

    @Override
    public ContactDto saveOrUpdateContact(String username, ContactDto dto) {
        Profile profile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with username: " + username));

        Optional<Contact> existingContactOpt = contactRepository.findByProfileUsername(username);
        Contact contact = existingContactOpt.orElseGet(Contact::new);

        contact.setLocation(dto.getLocation());
        contact.setPhone(dto.getPhone());
        contact.setEmail(dto.getEmail());
        contact.setLinkedin(dto.getLinkedin());
        contact.setGithub(dto.getGithub());
        contact.setFacebook(dto.getFacebook());
        contact.setInstagram(dto.getInstagram());
        contact.setOtherLinks(dto.getOtherLinks());
        contact.setProfile(profile);

        Contact savedContact = contactRepository.save(contact);
        return mapToContactDto(savedContact);
    }

    @Override
    public MessageDto sendMessage(String username, MessageDto dto) {
        Profile profile = profileRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with username: " + username));

        Message message = new Message();
        message.setName(dto.getName());
        message.setEmail(dto.getEmail());
        message.setSubject(dto.getSubject());
        message.setMessage(dto.getMessage());
        message.setProfile(profile);

        Message savedMessage = messageRepository.save(message);
        return mapToMessageDto(savedMessage);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageDto> getMessagesByUsername(String username) {
        return messageRepository.findByProfileUsernameOrderByCreatedAtDesc(username)
                .stream().map(this::mapToMessageDto).collect(Collectors.toList());
    }

    @Override
    public MessageDto markMessageAsRead(String username, UUID messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + messageId));

        if (!message.getProfile().getUsername().equalsIgnoreCase(username)) {
            throw new UnauthorizedActionException("You are not authorized to view this message.");
        }
        
        message.setRead(true);
        return mapToMessageDto(messageRepository.save(message));
    }

    @Override
    public void deleteMessage(String username, UUID messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + messageId));

        if (!message.getProfile().getUsername().equalsIgnoreCase(username)) {
            throw new UnauthorizedActionException("You are not authorized to delete this message.");
        }
        messageRepository.delete(message);
    }

    private ContactDto mapToContactDto(Contact entity) {
        ContactDto dto = new ContactDto();
        dto.setId(entity.getId());
        dto.setLocation(entity.getLocation());
        dto.setPhone(entity.getPhone());
        dto.setEmail(entity.getEmail());
        dto.setLinkedin(entity.getLinkedin());
        dto.setGithub(entity.getGithub());
        dto.setFacebook(entity.getFacebook());
        dto.setInstagram(entity.getInstagram());
        dto.setOtherLinks(entity.getOtherLinks());
        return dto;
    }

    private MessageDto mapToMessageDto(Message entity) {
        MessageDto dto = new MessageDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setSubject(entity.getSubject());
        dto.setMessage(entity.getMessage());
        dto.setRead(entity.isRead());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
