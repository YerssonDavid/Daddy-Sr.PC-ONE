package com.example.david.one.daddypcbackend.infraestructure.config.security.oauth;

import com.example.david.one.daddypcbackend.domain.enums.Provider;
import com.example.david.one.daddypcbackend.infraestructure.persistence.user.entity.UserEntity;
import com.example.david.one.daddypcbackend.infraestructure.persistence.user.repository.user.IUserRJpa;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2ExtractData extends DefaultOAuth2UserService {

    private final IUserRJpa iUserRJpa;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        //Executed when Spring Security receives user data from Google (user info endpoint)
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();

        //Extract email, Google ID (sub) and email verification from Google attributes
        String email = (String) attributes.get("email");
        String googleId = (String) attributes.get("sub");
        boolean emailVerified = Boolean.TRUE.equals(attributes.get("email_verified"));

        //If email is not verified by Google, throw exception and Spring Security redirects to /login?error
        if(!emailVerified){
            throw new OAuth2AuthenticationException(new OAuth2Error("Email not verified"));
        }

        //If user already exists in DB with that email, link their account with Google ID
        iUserRJpa.findByEmail(email).ifPresent(existingUser -> linkGoogleRegistry(existingUser, googleId));

        return oAuth2User;
    }

    private UserEntity linkGoogleRegistry(UserEntity user, String googleId){
        //Links an existing user (registered with email/password) to their Google account
        if(user.getProvider() == null){
            user.setProvider(Provider.GOOGLE);
            user.setProviderId(googleId);
            iUserRJpa.save(user);
        }
        return user;
    }
}
