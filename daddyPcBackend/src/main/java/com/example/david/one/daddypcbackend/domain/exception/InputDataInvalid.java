package com.example.david.one.daddypcbackend.domain.exception;

public class InputDataInvalid extends RuntimeException {

    public InputDataInvalid(String message) {
        super(message);
    }

    public InputDataInvalid(String message, Throwable cause) {
        super(message, cause);
    }

    public InputDataInvalid(Throwable cause) {
        super(cause);
    }
}
