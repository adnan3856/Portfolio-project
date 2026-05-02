package com.adnan.portfolio.portfolio_v2.service;

import com.adnan.portfolio.portfolio_v2.dto.ContactDto;
import com.adnan.portfolio.portfolio_v2.dto.MessageDto;
import java.util.List;
import java.util.UUID;

public interface ContactService {
    ContactDto getContactByUsername(String username);
    ContactDto saveOrUpdateContact(String username, ContactDto contactDto);
    
    MessageDto sendMessage(String username, MessageDto messageDto);
    List<MessageDto> getMessagesByUsername(String username);
    MessageDto markMessageAsRead(String username, UUID messageId);
    void deleteMessage(String username, UUID messageId);
}
