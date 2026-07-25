package com.example.david.one.daddypcbackend.infraestructure.persistence.user.entity;

import com.example.david.one.daddypcbackend.domain.enums.Provider;
import com.example.david.one.daddypcbackend.domain.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "name", nullable = true, length = 100)
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String name;

    @Column(name = "surname", nullable = true, length = 100)
    @Size(min = 2, max = 100, message = "El apellido debe tener entre 2 y 100 caracteres")
    private String surname;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe tener un formato válido")
    @Size(max = 255, message = "El email no puede exceder 255 caracteres")
    private String email;

    @Column(name = "apod", nullable = true, unique = false, length = 50)
    @Size(min = 3, max = 50, message = "El apodo debe tener entre 3 y 50 caracteres")
    private String apod;

    @Column(name = "password", nullable = true, length = 255)
    @Size(min = 8, max = 128, message = "La contraseña debe tener entre 8 y 128 caracteres")
    private String password;

    @Column(name = "interest", nullable = true, length = 100)
    @Size(min = 2, max = 100, message = "El interés debe tener entre 2 y 100 caracteres")
    private String interest;

    @Column(name = "created_at_user", nullable = false, updatable = false)
    private LocalDateTime createdAtUser;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false)
    private Provider provider;

    @Column(name = "providerId", nullable = true)
    private String providerId;
}
