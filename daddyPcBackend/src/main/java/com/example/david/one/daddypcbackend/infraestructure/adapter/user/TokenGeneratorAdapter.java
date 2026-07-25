package com.example.david.one.daddypcbackend.infraestructure.adapter.user;

import com.example.david.one.daddypcbackend.application.command.user.GenerateTokenUserCommand;
import com.example.david.one.daddypcbackend.application.port.out.user.ITokenGeneratorR;
import com.example.david.one.daddypcbackend.infraestructure.config.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenGeneratorAdapter implements ITokenGeneratorR {

    private final JwtProvider jwtProvider;

    @Override
    public String generateToken(GenerateTokenUserCommand command) {
        return jwtProvider.generateToken(command);
    }
}
