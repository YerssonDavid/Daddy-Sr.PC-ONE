package com.example.david.one.daddypcbackend.infraestructure.persistence.user.repository.user;

import com.example.david.one.daddypcbackend.infraestructure.persistence.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IUserRJpa extends JpaRepository<UserEntity, UUID> {
    boolean existsUserByEmail(String email);
}
