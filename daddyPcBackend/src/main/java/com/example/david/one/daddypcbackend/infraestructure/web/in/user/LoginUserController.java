package com.example.david.one.daddypcbackend.infraestructure.web.in.user;

import com.example.david.one.daddypcbackend.application.command.user.LoginUserCommand;
import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;
import com.example.david.one.daddypcbackend.application.port.in.user.ILoginUser;
import com.example.david.one.daddypcbackend.infraestructure.web.in.user.dto.LoginUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login/user")
@RequiredArgsConstructor
public class LoginUserController {

    private final ILoginUser iLoginUser;

    @PostMapping
    public ResponseEntity<ServerResponseDTO> loginUser(@RequestBody LoginUserRequest loginUserRequest){
        //Convert request to command
        LoginUserCommand command = new LoginUserCommand(
                loginUserRequest.email().trim().toLowerCase(),
                loginUserRequest.password()
        );
        return ResponseEntity.ok(iLoginUser.login(command.email(), command.password()));
    }
}
