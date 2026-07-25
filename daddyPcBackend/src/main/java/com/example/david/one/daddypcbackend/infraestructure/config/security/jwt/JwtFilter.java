package com.example.david.one.daddypcbackend.infraestructure.config.security.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //Extract JWT token from Authorization header: Bearer <token>
        String jwt = request.getHeader("Authorization");
        final String username;
        final String idUser;

        //If Authorization header contains a Bearer token, process it
        if(jwt != null && jwt.startsWith("Bearer ")){
            String token = jwt.substring(7);

            //Check if token has expired
            if(jwtProvider.isExpired(token)){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Expired token");
                return;
            }

            //Extract claims from token (email, id, role)
            Claims claims = jwtProvider.extractClaims(token);
            username = claims.getSubject();
            idUser = claims.get("id", String.class);

            //If user is not yet authenticated in security context
            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                if (jwtProvider.tokenIsValid(token)) {
                    //Get role from claims and assign as Spring Security authority
                    String role = claims.get("role", String.class);
                    List<GrantedAuthority> authority = List.of(new SimpleGrantedAuthority("ROLE_" + role));

                    //Create Spring authentication token with JWT data
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            username,
                            idUser,
                            authority
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    //Set authentication in security context
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            //Continue with filter chain
            filterChain.doFilter(request, response);
        } else {
            //If no Bearer token, respond with 401 but let pass through
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("No token provided");
            filterChain.doFilter(request, response);
            return;
        }
    }

    //Routes that do not require authorization or JWT token (login, registry, and free AI query)
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/login") || path.startsWith("/registry") || path.equals("/ai/free/user");
    }
}
