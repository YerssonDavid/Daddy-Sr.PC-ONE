package com.example.david.one.daddypcbackend.infraestructure.adapter.user;

import com.example.david.one.daddypcbackend.application.port.out.user.IPasswordEncoder;
import com.example.david.one.daddypcbackend.infraestructure.config.security.Security;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PasswordEncoderAdapter implements IPasswordEncoder {

    private final Security security;

    @Override
    public String encodePassword(String password) {
        return security.passwordEncoder().encode(password);
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        return security.passwordEncoder().matches(rawPassword, encodedPassword);
    }
}
