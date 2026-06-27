package com.example.david.one.daddypcbackend.infraestructure.config.beans.user;

import com.example.david.one.daddypcbackend.application.port.out.user.IPasswordEncoder;
import com.example.david.one.daddypcbackend.application.port.out.user.IUserR;
import com.example.david.one.daddypcbackend.application.useCase.user.RegistryUserUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigUser {
    @Bean
    public RegistryUserUseCase registryUserUseCase(IUserR iUserR, IPasswordEncoder iPasswordEncoder) {
        return new RegistryUserUseCase(iUserR, iPasswordEncoder);
    }
}
