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
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("username");
        String googleId = (String) attributes.get("sub");
        boolean emailVerified = (boolean) attributes.get("email_verified");

        if(!emailVerified){
            throw new OAuth2AuthenticationException(new OAuth2Error("Email not verified"));
        }

        iUserRJpa.findByEmail(email).ifPresent(existingUser -> linkGoogleRegistry(existingUser, googleId));

        return oAuth2User;
    }

    private UserEntity linkGoogleRegistry(UserEntity user, String googleId){
        if(user.getProvider() == null){
            user.setProvider(Provider.GOOGLE);
            user.setProviderId(googleId);
            iUserRJpa.save(user);
        }
        return user;
    }
}
