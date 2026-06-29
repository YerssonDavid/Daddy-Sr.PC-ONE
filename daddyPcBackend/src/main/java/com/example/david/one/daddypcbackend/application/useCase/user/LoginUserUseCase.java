package com.example.david.one.daddypcbackend.application.useCase.user;

import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;
import com.example.david.one.daddypcbackend.application.port.in.user.ILoginUser;
import com.example.david.one.daddypcbackend.application.port.out.user.IPasswordEncoder;
import com.example.david.one.daddypcbackend.application.port.out.user.IUserR;
import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;
import com.example.david.one.daddypcbackend.domain.model.User;

import java.util.Optional;

public class LoginUserUseCase implements ILoginUser {
    private final IUserR iUserR;
    private final IPasswordEncoder iPasswordEncoder;

    public LoginUserUseCase(IUserR iUserR, IPasswordEncoder iPasswordEncoder) {
        this.iUserR = iUserR;
        this.iPasswordEncoder = iPasswordEncoder;
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

        return new ServerResponseDTO(
                "Login existoso",
                true,
                Optional.empty()
        );
    }
}
