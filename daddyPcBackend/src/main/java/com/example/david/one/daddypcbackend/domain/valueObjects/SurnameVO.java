package com.example.david.one.daddypcbackend.domain.valueObjects;

import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;

public record SurnameVO(String value) {

    public SurnameVO {
        if (value == null || value.trim().isEmpty()) {
            throw new InputDataInvalid("El apellido no puede estar vacío");
        }
        if (value.length() < 2 || value.length() > 100) {
            throw new InputDataInvalid("El apellido debe tener entre 2 y 100 caracteres");
        }
        if (!value.matches("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$")) {
            throw new InputDataInvalid("El apellido solo puede contener letras y espacios");
        }
    }
}
