package com.example.david.one.daddypcbackend.domain.valueObjects;

import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;

public record EmailVO(String value) {

    public EmailVO {
        if (value == null || value.trim().isEmpty()) {
            throw new InputDataInvalid("El email no puede estar vacío");
        }
        if (!isValidEmail(value)) {
            throw new InputDataInvalid("El email tiene un formato inválido");
        }
        if (value.length() > 255) {
            throw new InputDataInvalid("El email no puede exceder 255 caracteres");
        }
    }

    private static boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    }
}
