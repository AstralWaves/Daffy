package com.daffy.service;

import com.daffy.dto.UserDto;
import com.daffy.dto.UserProfileDto;
import com.daffy.dto.UserRegistrationDto;
import com.daffy.entity.Role;
import com.daffy.entity.User;
import com.daffy.exception.ResourceNotFoundException;
import com.daffy.exception.UserAlreadyExistsException;
import com.daffy.repository.RoleRepository;
import com.daffy.repository.UserRepository;
import com.daffy.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    // FIXED: Implementation for findUserById
    public UserDto findUserById(Long id) {
        log.info("Finding user by ID: {}", id);
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return convertToUserDto(user);
    }

    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return convertToUserDto(user);
    }

    public UserProfileDto getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return convertToUserProfileDto(user);
    }

    public UserDto updateUserProfile(Long userId, UserProfileDto profileDto, UserPrincipal currentUser) {
        if (!currentUser.getId().equals(userId) && 
            !currentUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            throw new AccessDeniedException("You can only update your own profile");
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setFirstName(profileDto.getFirstName());
        user.setLastName(profileDto.getLastName());
        user.setBio(profileDto.getBio());
        user.setLocation(profileDto.getLocation());
        user.setWebsite(profileDto.getWebsite());
        user.setDateOfBirth(profileDto.getDateOfBirth());
        user.setGender(profileDto.getGender());
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);
        return convertToUserDto(updatedUser);
    }

    public Page<UserDto> searchUsers(String keyword, Pageable pageable) {
        return userRepository.searchUsers(keyword, pageable)
            .map(this::convertToUserDto);
    }

    public Page<UserDto> getActiveUsers(Pageable pageable) {
        return userRepository.findActiveUsers(pageable)
            .map(this::convertToUserDto);
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.DELETED);
        user.setEnabled(false);
        
        userRepository.save(user);
        log.info("User deleted: {}", user.getUsername());
    }

    public User registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists: " + registrationDto.getUsername());
        }

        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists: " + registrationDto.getEmail());
        }

        User user = User.builder()
            .username(registrationDto.getUsername())
            .email(registrationDto.getEmail())
            .password(registrationDto.getPassword())
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
        return savedUser;
    }

    public void suspendUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.SUSPENDED);
        user.setEnabled(false);
        
        userRepository.save(user);
        log.info("User suspended: {}", user.getUsername());
    }

    public void activateUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setStatus(User.UserStatus.ACTIVE);
        user.setEnabled(true);
        
        userRepository.save(user);
        log.info("User activated: {}", user.getUsername());
    }

    public void updateLastLogin(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public List<UserDto> searchUsers(String query) {
        return userRepository.searchUsers(query, Pageable.unpaged())
            .getContent()
            .stream()
            .map(this::convertToUserDto)
            .collect(Collectors.toList());
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
            .map(this::convertToUserDto)
            .collect(Collectors.toList());
    }

    private UserDto convertToUserDto(User user) {
        return UserDto.builder()
            .id(user.getId())
            .username(user.getUsername())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .bio(user.getBio())
            .profileImageUrl(user.getProfileImageUrl())
            .coverImageUrl(user.getCoverImageUrl())
            .location(user.getLocation())
            .website(user.getWebsite())
            .dateOfBirth(user.getDateOfBirth())
            .gender(user.getGender())
            .status(user.getStatus())
            .enabled(user.isEnabled())
            .locked(user.isLocked())
            .emailVerified(user.isEmailVerified())
            .createdAt(user.getCreatedAt())
            .updatedAt(user.getUpdatedAt())
            .lastLoginAt(user.getLastLoginAt())
            .build();
    }

    private UserProfileDto convertToUserProfileDto(User user) {
        return UserProfileDto.builder()
            .id(user.getId())
            .username(user.getUsername())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .bio(user.getBio())
            .profileImageUrl(user.getProfileImageUrl())
            .coverImageUrl(user.getCoverImageUrl())
            .location(user.getLocation())
            .website(user.getWebsite())
            .dateOfBirth(user.getDateOfBirth())
            .gender(user.getGender())
            .createdAt(user.getCreatedAt())
            .build();
    }
}