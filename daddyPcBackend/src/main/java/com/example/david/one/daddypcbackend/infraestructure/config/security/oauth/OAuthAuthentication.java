package com.example.david.one.daddypcbackend.infraestructure.config.security.oauth;

import com.example.david.one.daddypcbackend.application.command.user.GenerateTokenUserCommand;
import com.example.david.one.daddypcbackend.domain.enums.Role;
import com.example.david.one.daddypcbackend.infraestructure.config.security.jwt.JwtProvider;
import com.example.david.one.daddypcbackend.infraestructure.persistence.user.entity.UserEntity;
import com.example.david.one.daddypcbackend.infraestructure.persistence.user.repository.user.IUserRJpa;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuthAuthentication implements AuthenticationSuccessHandler {

    private String urlFrontend = "http://localhost:4200"; //"https://daddypc.up-x.me";
    private final IUserRJpa iUserRJpa;
    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        //Successful OAuth2 authentication with Google
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");

        //Check if user already exists in DB, if not create automatically
        UserEntity user = iUserRJpa.findByEmail(email)
                .orElseGet(() -> {
                    UUID id = UUID.randomUUID();
                    while(true){
                        if(iUserRJpa.findById(id).isPresent()){
                            id = UUID.randomUUID();
                        } else {
                            break;
                        }
                    }

                    //Build new user with Google data
                    UserEntity userEntity = UserEntity.builder()
                            .id(id)
                            .email(email)
                            .providerId((String) attributes.get("sub"))
                            .provider(com.example.david.one.daddypcbackend.domain.enums.Provider.GOOGLE)
                            .createdAtUser(LocalDateTime.now())
                            .role(Role.USER)
                            .build();

                    return iUserRJpa.save(userEntity);
                });

        //Create command with user data to generate JWT
        GenerateTokenUserCommand command = new GenerateTokenUserCommand(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );

        //Generate JWT token with user information
        String token = jwtProvider.generateToken(command);

        //Redirect to frontend with token as query param
        String redirect = urlFrontend + "/api/auth/oauth?t=" + token;
        response.sendRedirect(redirect);
    }
}
