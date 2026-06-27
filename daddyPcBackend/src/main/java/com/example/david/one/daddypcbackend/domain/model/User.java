package com.example.david.one.daddypcbackend.domain.model;

import com.example.david.one.daddypcbackend.domain.valueObjects.*;

import java.util.UUID;

public class User {
    private UUID id;
    private NameVO name;
    private SurnameVO surname;
    private EmailVO email;
    private ApodVO apod;
    private String password;
    private InterestVO interest;

    public User() {
    }

    public User(UUID id ,NameVO name, SurnameVO surname, EmailVO email, ApodVO apod, String password, InterestVO interest) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.apod = apod;
        this.password = password;
        this.interest = interest;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public NameVO getName() {
        return name;
    }

    public void setName(NameVO name) {
        this.name = name;
    }

    public SurnameVO getSurname() {
        return surname;
    }

    public void setSurname(SurnameVO surname) {
        this.surname = surname;
    }

    public EmailVO getEmail() {
        return email;
    }

    public void setEmail(EmailVO email) {
        this.email = email;
    }

    public ApodVO getApod() {
        return apod;
    }

    public void setApod(ApodVO apod) {
        this.apod = apod;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public InterestVO getInterest() {
        return interest;
    }

    public void setInterest(InterestVO interest) {
        this.interest = interest;
    }
}
