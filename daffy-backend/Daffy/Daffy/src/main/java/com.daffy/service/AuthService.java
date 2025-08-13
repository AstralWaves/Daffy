package com.daffy.service;

import com.daffy.dto.AuthResponse;
import com.daffy.dto.SigninRequest;
import com.daffy.dto.SignupRequest;
import com.daffy.entity.User;
import com.daffy.entity.VerificationToken;
import com.daffy.repository.UserRepository;
import com.daffy.repository.VerificationTokenRepository;
import com.daffy.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerificationTokenRepository tokenRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            return new AuthResponse(null, "Email already exists");
        }
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return new AuthResponse(null, "Username already exists");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setUserType(request.getUserType());
        user.setDepartment(request.getDepartment());
        user.setSemester(request.getSemester());
        user.setJoiningYear(request.getJoiningYear());
        user.setGraduationYear(request.getGraduationYear());
        user.setVerified(false);
        userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));
        tokenRepository.save(verificationToken);

        // Simulate email sending (implement actual email service later)
        return new AuthResponse(null, "Signup successful, verification email sent");
    }

    public AuthResponse signin(SigninRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, "Invalid credentials");
        }
        if (!user.isVerified()) {
            return new AuthResponse(null, "Email not verified");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, "Signin successful");
    }

    public AuthResponse verifyEmail(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);
        if (verificationToken == null || verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return new AuthResponse(null, "Invalid or expired token");
        }
        User user = verificationToken.getUser();
        user.setVerified(true);
        userRepository.save(user);
        tokenRepository.delete(verificationToken);
        return new AuthResponse(null, "Email verified");
    }
}