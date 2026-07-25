package com.example.david.one.daddypcbackend.application.port.out.user;

import com.example.david.one.daddypcbackend.application.command.user.GenerateTokenUserCommand;

public interface ITokenGeneratorR {
    String generateToken(GenerateTokenUserCommand command);
}
