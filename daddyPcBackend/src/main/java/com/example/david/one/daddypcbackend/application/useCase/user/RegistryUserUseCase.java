package com.example.david.one.daddypcbackend.application.useCase.user;

import com.example.david.one.daddypcbackend.application.command.user.CreateUserCommand;
import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;
import com.example.david.one.daddypcbackend.application.port.in.user.IRegistryUser;
import com.example.david.one.daddypcbackend.application.port.out.user.IPasswordEncoder;
import com.example.david.one.daddypcbackend.application.port.out.user.IUserR;
import com.example.david.one.daddypcbackend.domain.exception.InputDataInvalid;
import com.example.david.one.daddypcbackend.domain.model.User;
import com.example.david.one.daddypcbackend.domain.valueObjects.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public class RegistryUserUseCase implements IRegistryUser {

    private final IUserR userR;
    private final IPasswordEncoder passwordEncoder;

    public RegistryUserUseCase(IUserR userR, IPasswordEncoder passwordEncoder) {
        this.userR = userR;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ServerResponseDTO registryUser(CreateUserCommand command) {

        String emailFormat = command.email().trim().toLowerCase();

        //Validate if exist user with it email ingress
        if(userR.existUserByEmail(emailFormat)){
           throw new InputDataInvalid("El email ya esta registrado!");
        }

        //Generate Id in UUID for User
        UUID uuid = UUID.randomUUID();

        //Validate if exist user with it ID
        while(true){
            if(userR.existUserById(uuid)){
                uuid = UUID.randomUUID();
            } else {
                break;
            }
        }

        //Value Objects
        NameVO name = new NameVO(command.name());
        SurnameVO surname = new SurnameVO(command.surname());
        EmailVO email = new EmailVO(emailFormat);
        ApodVO apod = new ApodVO(command.apod());
        PasswordVO password = new PasswordVO(command.password());
        InterestVO interest = new InterestVO(command.interest());


        //Encode password
        String passwordHash = passwordEncoder.encodePassword(password.value());

        //Create User
        User user = new User();
        user.setId(uuid);
        user.setName(name);
        user.setSurname(surname);
        user.setEmail(email);
        user.setApod(apod);
        user.setPassword(passwordHash);
        user.setInterest(interest);
        user.setCreatedAtUser(LocalDateTime.now());

        //Save User
        userR.save(user);

        //Return response
        return new ServerResponseDTO(
                "User registry successfully",
                true,
                Optional.of(LocalDate.now())
        );
    }
}
