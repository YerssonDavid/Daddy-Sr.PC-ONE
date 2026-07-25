package com.example.david.one.daddypcbackend.infraestructure.config.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt-properties.jwt")
public record JwtProperties(
        String secretKey,
        long expirationTime
) {
}
