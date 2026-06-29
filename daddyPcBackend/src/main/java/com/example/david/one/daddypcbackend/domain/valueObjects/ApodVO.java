package com.example.david.one.daddypcbackend.domain.valueObjects;

import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;

public record ApodVO(String value) {

    public ApodVO {
        if (value == null || value.trim().isEmpty()) {
            throw new InputDataInvalid("El apodo no puede estar vacío");
        }
        if (value.length() < 3 || value.length() > 50) {
            throw new InputDataInvalid("El apodo debe tener entre 3 y 50 caracteres");
        }
        if (!value.matches("^[a-zA-Z0-9_-]+$")) {
            throw new InputDataInvalid("El apodo solo puede contener letras, números, guiones y guiones bajos");
        }
    }
}
