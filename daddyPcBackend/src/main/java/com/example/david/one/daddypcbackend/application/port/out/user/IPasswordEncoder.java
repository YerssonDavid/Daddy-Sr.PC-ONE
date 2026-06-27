package com.example.david.one.daddypcbackend.application.port.out.user;

public interface IPasswordEncoder {
    String encodePassword(String password);
    boolean matches(String rawPassword, String encodedPassword);
}
