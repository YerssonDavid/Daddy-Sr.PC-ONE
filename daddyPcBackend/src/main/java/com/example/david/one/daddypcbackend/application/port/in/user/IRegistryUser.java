package com.example.david.one.daddypcbackend.application.port.in.user;

import com.example.david.one.daddypcbackend.application.command.CreateUserCommand;
import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;

public interface IRegistryUser {
    ServerResponseDTO registryUser(CreateUserCommand command);
}
