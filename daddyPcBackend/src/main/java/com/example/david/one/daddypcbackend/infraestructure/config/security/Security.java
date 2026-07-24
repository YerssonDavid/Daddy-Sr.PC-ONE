package com.example.david.one.daddypcbackend.infraestructure.config.security;

import com.example.david.one.daddypcbackend.infraestructure.config.security.jwt.JwtFilter;
import com.example.david.one.daddypcbackend.infraestructure.config.security.jwt.JwtProperties;
import com.example.david.one.daddypcbackend.infraestructure.config.security.jwt.JwtProvider;
import com.example.david.one.daddypcbackend.infraestructure.config.security.oauth.OAuth2ExtractData;
import com.example.david.one.daddypcbackend.infraestructure.config.security.oauth.OAuthAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class Security {

    private final OAuth2ExtractData oAuth2ExtractData;
    private final OAuthAuthentication oAuthAuthentication;

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
        http
                .cors(c -> c.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                //Permit session for OAuth
                .sessionManagement(session -> session.sessionCreationPolicy(
                        SessionCreationPolicy.IF_REQUIRED
                ))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/registry/user").permitAll()
                        .requestMatchers(HttpMethod.POST, "/login/user").permitAll()
                        //Set authorization for token
                        .requestMatchers(HttpMethod.POST, "/ask").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/ask/support").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/ai/free/user").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth -> oauth.userInfoEndpoint(
                        userInfo -> userInfo.userService(oAuth2ExtractData)
                )
                                .successHandler(oAuthAuthentication)
                );
        return http.build();
    }

    //Password Encoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //Configuration Source of request
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("https://daddypc.up-x.me"));
        //config.setAllowedOrigins(List.of("http://localhost:4200"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Request-With"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
