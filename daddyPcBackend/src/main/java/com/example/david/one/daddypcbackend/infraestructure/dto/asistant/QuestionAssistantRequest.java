package com.example.david.one.daddypcbackend.infraestructure.dto.asistant;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record QuestionAssistantRequest(
        @NotBlank(message = "La pregunta no puede estar vacía")
        @Size(max = 2000, message = "La pregunta no puede superar los 2000 caracteres")
        String question

) {}
