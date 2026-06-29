package com.example.david.one.daddypcbackend.application.command.user;

public record CreateUserCommand(
    String name,
    String surname,
    String email,
    String apod,
    String password,
    String interest
) {
}
