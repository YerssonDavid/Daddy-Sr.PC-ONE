package com.example.david.one.daddypcbackend.application.dto;

import java.util.Optional;

public record ServerResponseDTO(
    String response,
    boolean success,
    Optional<Object> data
) {
}
