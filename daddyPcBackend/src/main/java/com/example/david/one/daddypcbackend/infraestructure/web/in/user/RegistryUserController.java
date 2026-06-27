package com.example.david.one.daddypcbackend.infraestructure.web.in.user;

import com.example.david.one.daddypcbackend.application.command.CreateUserCommand;
import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;
import com.example.david.one.daddypcbackend.application.port.in.user.IRegistryUser;
import com.example.david.one.daddypcbackend.infraestructure.web.in.user.dto.RegisterUserRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/registry/user")
public class RegistryUserController {
    private final IRegistryUser registryUser;

    public RegistryUserController(IRegistryUser registryUser) {
        this.registryUser = registryUser;
    }
    @PostMapping()
    public ResponseEntity<ServerResponseDTO> registryUser (@RequestBody @Valid RegisterUserRequest registerUserRequest) {
        //Convert request to command
        CreateUserCommand createUserCommand = new CreateUserCommand(
                registerUserRequest.name(),
                registerUserRequest.surname(),
                registerUserRequest.email(),
                registerUserRequest.apod(),
                registerUserRequest.password(),
                registerUserRequest.interest()
        );

        return ResponseEntity.ok(registryUser.registryUser(createUserCommand));
    }
}
