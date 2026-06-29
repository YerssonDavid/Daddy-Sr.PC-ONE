package com.example.david.one.daddypcbackend.application.port.in.user;

import com.example.david.one.daddypcbackend.application.dto.ServerResponseDTO;

public interface ILoginUser {
    ServerResponseDTO login(String email, String password);
}
