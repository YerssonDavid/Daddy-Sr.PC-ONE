package com.example.david.one.daddypcbackend.infraestructure.config.security.jwt;

import com.example.david.one.daddypcbackend.application.command.user.GenerateTokenUserCommand;
import com.example.david.one.daddypcbackend.infraestructure.persistence.user.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtProvider {

    private final String secretKey;
    // Expiration in minutes
    private final long expirationTime;


    //Inject to attributes of class properties jwt
    public JwtProvider(JwtProperties jwtProperties) {
        this.secretKey = jwtProperties.secretKey();
        this.expirationTime = jwtProperties.expirationTime();
    }

    // Decoder token
    private SecretKey getSingingKey(String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Validate secret state
    @PostConstruct
    void validateSecret() throws Exception {
        if(secretKey == null || secretKey.isEmpty()){
            throw new Exception("Secret is null or empty");
        }

        if(secretKey.getBytes().length < 32){
            throw new Exception("Secret length is less than 32");
        }
    }

    // Generate Token
    public String generateToken (GenerateTokenUserCommand command){
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", command.id());
        claims.put("email", command.email());
        claims.put("role", command.role());

        return buildToken(claims, command.email(), expirationTime);
    }

    // Build Token
    public String buildToken (Map<String, Object> claims, String subject, Long expirationTime){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expirationToken = now.plusMinutes(expirationTime);

        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(java.sql.Timestamp.valueOf(now))
                .expiration(java.sql.Timestamp.valueOf(expirationToken))
                .signWith(getSingingKey(secretKey))
                .compact();
    }

    //Extract Claims
    public Claims extractClaims(String token){
        return Jwts.parser()
                .verifyWith(getSingingKey(secretKey))
                .build()
                .parseSignedClaims(token)
                .getBody();
    }

    // Extract Token
    public String getToken(String authHeader){
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            return authHeader.substring(7);
        }
        return null;
    }

    // Validate Token
    public boolean tokenIsValid (String token){
        if(token == null || token.isEmpty()){
            throw new IllegalArgumentException("Token is null or empty");
        }
        return true;
    }

    // Is expired
    public boolean isExpired(String token){
        try{
            return extractClaims(token).getExpiration().before(new Date());
        } catch(Exception e){
            return true;
        }
    }
}
