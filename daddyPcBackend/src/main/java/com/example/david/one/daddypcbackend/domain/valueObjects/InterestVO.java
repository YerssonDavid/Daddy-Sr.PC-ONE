package com.example.david.one.daddypcbackend.domain.valueObjects;

import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;

public record InterestVO(String value) {

    public InterestVO {
        if (value == null || value.trim().isEmpty()) {
            throw new InputDataInvalid("El interés no puede estar vacío");
        }
        if (value.length() < 2 || value.length() > 100) {
            throw new InputDataInvalid("El interés debe tener entre 2 y 100 caracteres");
        }
        if (!value.matches("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s,.-]+$")) {
            throw new InputDataInvalid("El interés contiene caracteres no permitidos");
        }
    }
}
