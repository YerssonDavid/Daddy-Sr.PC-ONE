package com.example.david.one.daddypcbackend.application.command.user;

public record LoginUserCommand(
        String email,
        String password
) {
}
