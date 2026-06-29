package com.example.david.one.daddypcbackend.infraestructure.web.in.user.dto;

import jakarta.validation.constraints.*;

public record RegisterUserRequest(
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 1, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    String name,

    @NotBlank(message = "El apellido no puede estar vacío")
    @Size(min = 1, max = 100, message = "El apellido debe tener entre 2 y 100 caracteres")
    String surname,

    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe tener un formato válido")
    String email,

    @NotBlank(message = "El apodo no puede estar vacío")
    @Size(min = 1, max = 50, message = "El apodo debe tener entre 3 y 50 caracteres")
    String apod,

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 8, max = 128, message = "La contraseña debe tener entre 8 y 128 caracteres")
    String password,

    @NotBlank(message = "El interés no puede estar vacío")
    @Size(min = 2, max = 100, message = "El interés debe tener entre 2 y 100 caracteres")
    String interest
) {
}
