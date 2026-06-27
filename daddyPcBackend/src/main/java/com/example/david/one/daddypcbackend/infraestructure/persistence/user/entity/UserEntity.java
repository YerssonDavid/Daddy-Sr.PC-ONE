package com.example.david.one.daddypcbackend.infraestructure.persistence.user.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "name", nullable = false, length = 100)
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String name;

    @Column(name = "surname", nullable = false, length = 100)
    @NotBlank(message = "El apellido no puede estar vacío")
    @Size(min = 2, max = 100, message = "El apellido debe tener entre 2 y 100 caracteres")
    private String surname;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe tener un formato válido")
    @Size(max = 255, message = "El email no puede exceder 255 caracteres")
    private String email;

    @Column(name = "apod", nullable = false, unique = true, length = 50)
    @NotBlank(message = "El apodo no puede estar vacío")
    @Size(min = 3, max = 50, message = "El apodo debe tener entre 3 y 50 caracteres")
    private String apod;

    @Column(name = "password", nullable = false, length = 255)
    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 8, max = 128, message = "La contraseña debe tener entre 8 y 128 caracteres")
    private String password;

    @Column(name = "interest", nullable = false, length = 100)
    @NotBlank(message = "El interés no puede estar vacío")
    @Size(min = 2, max = 100, message = "El interés debe tener entre 2 y 100 caracteres")
    private String interest;
}
