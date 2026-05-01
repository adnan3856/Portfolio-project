package com.adnan.portfolio.portfolio_v2.service;

import com.adnan.portfolio.portfolio_v2.dto.AboutDto;

public interface AboutService {
    AboutDto saveAbout(String username, AboutDto aboutDto);
    AboutDto getAboutByUsername(String username);
    AboutDto updateAbout(String username, AboutDto aboutDto);
}
