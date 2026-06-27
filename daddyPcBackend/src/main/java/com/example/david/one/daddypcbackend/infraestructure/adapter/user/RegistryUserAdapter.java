package com.example.david.one.daddypcbackend.infraestructure.adapter.user;

import com.example.david.one.daddypcbackend.application.port.out.user.IUserR;
import com.example.david.one.daddypcbackend.domain.model.User;
import com.example.david.one.daddypcbackend.infraestructure.mapper.UserMapper;
import com.example.david.one.daddypcbackend.infraestructure.persistence.user.entity.UserEntity;
import com.example.david.one.daddypcbackend.infraestructure.persistence.user.repository.user.IUserRJpa;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RegistryUserAdapter implements IUserR {
    private final IUserRJpa iUserRJPa;

    @Override
    public boolean existUserById(UUID id) {
        return iUserRJPa.existsById(id);
    }

    @Override
    public void save(User user) {
        UserEntity userEntity = UserMapper.toEntity(user);
        iUserRJPa.save(userEntity);
    }

    @Override
    public boolean existUserByEmail(String email) {
        return iUserRJPa.existsUserByEmail(email);
    }
}
