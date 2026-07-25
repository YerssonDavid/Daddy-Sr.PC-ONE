package com.example.david.one.daddypcbackend.application.useCase.user;

import com.example.david.one.daddypcbackend.application.command.user.GenerateTokenUserCommand;
import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;
import com.example.david.one.daddypcbackend.application.port.in.user.ILoginUser;
import com.example.david.one.daddypcbackend.application.port.out.user.IPasswordEncoder;
import com.example.david.one.daddypcbackend.application.port.out.user.ITokenGeneratorR;
import com.example.david.one.daddypcbackend.application.port.out.user.IUserR;
import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;
import com.example.david.one.daddypcbackend.domain.model.User;

import java.util.Optional;

public class LoginUserUseCase implements ILoginUser {
    private final IUserR iUserR;
    private final IPasswordEncoder iPasswordEncoder;
    private final ITokenGeneratorR iTokenGenerator;

    public LoginUserUseCase(IUserR iUserR, IPasswordEncoder iPasswordEncoder, ITokenGeneratorR iTokenGenerator) {
        this.iUserR = iUserR;
        this.iPasswordEncoder = iPasswordEncoder;
        this.iTokenGenerator = iTokenGenerator;
    }

    @Override
    public ServerResponseDTO login(String email, String password) {
        String emailFormat = email.trim().toLowerCase();

        Optional<User> user = iUserR.findUserByEmail(emailFormat);

        if(user.isEmpty()){
            throw new InputDataInvalid("El email ingresado no esta registrado!");
        }

        String passwordDb = user.map(User::getPassword).orElse(null);

        //Validate password
        if(!iPasswordEncoder.matches(password, passwordDb)){
            throw new InputDataInvalid("Contraseña incorrecta");
        }

        //Generate token
        String token = iTokenGenerator.generateToken(
                new GenerateTokenUserCommand(
                        user.get().getId(),
                        user.get().getEmail().value(),
                        user.get().getRole()
                )
        );

        return new ServerResponseDTO(
                "Login existoso",
                true,
                Optional.of(token)
        );
    }
}
