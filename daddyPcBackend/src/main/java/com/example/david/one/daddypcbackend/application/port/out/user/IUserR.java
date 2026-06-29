package com.example.david.one.daddypcbackend.application.port.out.user;

import com.example.david.one.daddypcbackend.domain.model.User;

import java.util.Optional;
import java.util.UUID;

public interface IUserR {
    boolean existUserById(UUID id);
    void save(User user);
    boolean existUserByEmail(String email);
    Optional<User> findUserByEmail(String email);
}
