package com.daffy.service;

import com.daffy.dto.AuthResponseDto;
import com.daffy.dto.LoginDto;
import com.daffy.dto.UserRegistrationDto;
import com.daffy.entity.Role;
import com.daffy.entity.User;
import com.daffy.exception.UserAlreadyExistsException;
import com.daffy.repository.RoleRepository;
import com.daffy.repository.UserRepository;
import com.daffy.security.JwtTokenProvider;
import com.daffy.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthResponseDto login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        // Update last login time
        User user = userRepository.findById(userPrincipal.getId()).orElse(null);
        if (user != null) {
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);
        }
        
        String accessToken = tokenProvider.generateAccessToken(userPrincipal.getId());
        String refreshToken = tokenProvider.generateRefreshToken(userPrincipal.getId());

        return AuthResponseDto.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .expiresIn(86400L) // 24 hours in seconds
            .build();
    }

    public AuthResponseDto register(UserRegistrationDto registrationDto) {
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists: " + registrationDto.getUsername());
        }

        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists: " + registrationDto.getEmail());
        }

        User user = User.builder()
            .username(registrationDto.getUsername())
            .email(registrationDto.getEmail())
            .password(passwordEncoder.encode(registrationDto.getPassword()))
            .firstName(registrationDto.getFirstName())
            .lastName(registrationDto.getLastName())
            .status(User.UserStatus.ACTIVE)
            .enabled(true)
            .locked(false)
            .emailVerified(false)
            .createdAt(LocalDateTime.now())
            .build();

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Default role not found"));
        roles.add(userRole);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getUsername());

        String accessToken = tokenProvider.generateAccessToken(savedUser.getId());
        String refreshToken = tokenProvider.generateRefreshToken(savedUser.getId());

        return AuthResponseDto.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .expiresIn(86400L) // 24 hours in seconds
            .build();
    }

    public AuthResponseDto refreshToken(String refreshToken) {
        if (!tokenProvider.validateRefreshToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        Long userId = tokenProvider.getUserIdFromRefreshToken(refreshToken);
        String newAccessToken = tokenProvider.generateAccessToken(userId);
        String newRefreshToken = tokenProvider.generateRefreshToken(userId);

        return AuthResponseDto.builder()
            .accessToken(newAccessToken)
            .refreshToken(newRefreshToken)
            .tokenType("Bearer")
            .expiresIn(86400L) // 24 hours in seconds
            .build();
    }
}