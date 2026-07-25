package com.example.david.one.daddypcbackend.application.command.user;

import com.example.david.one.daddypcbackend.domain.enums.Role;

import java.util.UUID;

public record GenerateTokenUserCommand(
        UUID id,
        String email,
        Role role
) {
}