package com.example.david.one.daddypcbackend.domain.valueObjects;

import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;

public record PasswordVO(String value) {

    public PasswordVO {
        if (value == null || value.trim().isEmpty()) {
            throw new InputDataInvalid("La contraseña no puede estar vacía");
        }
        if (value.length() < 8) {
            throw new InputDataInvalid("La contraseña debe tener al menos 8 caracteres");
        }
        if (value.length() > 128) {
            throw new InputDataInvalid("La contraseña no puede exceder 128 caracteres");
        }
        if (!value.matches(".*[A-Z].*")) {
            throw new InputDataInvalid("La contraseña debe contener al menos una letra mayúscula");
        }
        if (!value.matches(".*[a-z].*")) {
            throw new InputDataInvalid("La contraseña debe contener al menos una letra minúscula");
        }
        if (!value.matches(".*[0-9].*")) {
            throw new InputDataInvalid("La contraseña debe contener al menos un número");
        }
        if (!value.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
            throw new InputDataInvalid("La contraseña debe contener al menos un carácter especial");
        }
    }
}
