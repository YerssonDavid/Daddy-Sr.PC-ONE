package com.example.david.one.daddypcbackend.application.command;

public record CreateUserCommand(
    String name,
    String surname,
    String email,
    String apod,
    String password,
    String interest
) {
}
