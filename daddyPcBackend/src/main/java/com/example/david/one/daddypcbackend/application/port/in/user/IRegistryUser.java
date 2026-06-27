package com.example.david.one.daddypcbackend.application.port.in.user;

import com.example.david.one.daddypcbackend.application.command.user.CreateUserCommand;
import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;

public interface IRegistryUser {
    ServerResponseDTO registryUser(CreateUserCommand command);
}
