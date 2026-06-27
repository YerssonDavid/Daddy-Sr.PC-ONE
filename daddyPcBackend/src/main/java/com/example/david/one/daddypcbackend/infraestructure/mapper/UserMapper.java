package com.example.david.one.daddypcbackend.infraestructure.mapper;

import com.example.david.one.daddypcbackend.domain.model.User;
import com.example.david.one.daddypcbackend.domain.valueObjects.*;
import com.example.david.one.daddypcbackend.infraestructure.persistence.user.entity.UserEntity;
import org.springframework.stereotype.Component;

public class UserMapper {

    public static UserEntity toEntity(User user) {
        if (user == null) {
            return null;
        }

        UserEntity entity = new UserEntity();
        entity.setId(user.getId());
        entity.setName(user.getName().value());
        entity.setSurname(user.getSurname().value());
        entity.setEmail(user.getEmail().value());
        entity.setApod(user.getApod().value());
        entity.setPassword(user.getPassword());
        entity.setInterest(user.getInterest().value());

        return entity;
    }

    public static User toDomain(UserEntity entity) {
        if (entity == null) {
            return null;
        }

        return new User(
            entity.getId(),
            new NameVO(entity.getName()),
            new SurnameVO(entity.getSurname()),
            new EmailVO(entity.getEmail()),
            new ApodVO(entity.getApod()),
            entity.getPassword(),
            new InterestVO(entity.getInterest())
        );
    }
}
