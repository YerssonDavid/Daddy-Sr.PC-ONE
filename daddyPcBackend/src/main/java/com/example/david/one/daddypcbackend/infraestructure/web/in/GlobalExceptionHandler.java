package com.example.david.one.daddypcbackend.infraestructure.web.in;

import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;
import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Optional;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ServerResponseDTO> handleValidation(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return ResponseEntity.badRequest()
                .body(new ServerResponseDTO(errors, false, Optional.empty()));
    }

    @ExceptionHandler(InputDataInvalid.class)
    public ResponseEntity<ServerResponseDTO> handleInputDataInvalid(InputDataInvalid ex) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(new ServerResponseDTO(ex.getMessage(), false, Optional.empty()));
    }
}
