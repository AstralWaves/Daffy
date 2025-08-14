package com.daffy.config;

import com.daffy.entity.Role;
import com.daffy.entity.User;
import com.daffy.repository.RoleRepository;
import com.daffy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("Initializing database with default data...");
        
        // Initialize roles
        initializeRoles();
        
        // Initialize admin user
        initializeAdminUser();
        
        log.info("Database initialization completed successfully!");
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            log.info("Creating default roles...");
            
            Role userRole = Role.builder()
                    .name(Role.RoleName.ROLE_USER)
                    .description("Regular user role")
                    .build();
            
            Role moderatorRole = Role.builder()
                    .name(Role.RoleName.ROLE_MODERATOR)
                    .description("Moderator role with limited admin privileges")
                    .build();
            
            Role adminRole = Role.builder()
                    .name(Role.RoleName.ROLE_ADMIN)
                    .description("Administrator role with full system access")
                    .build();
            
            Role superAdminRole = Role.builder()
                    .name(Role.RoleName.ROLE_SUPER_ADMIN)
                    .description("Super administrator role with all privileges")
                    .build();
            
            roleRepository.saveAll(List.of(userRole, moderatorRole, adminRole, superAdminRole));
            log.info("Default roles created successfully");
        }
    }

    private void initializeAdminUser() {
        if (!userRepository.existsByUsername("admin")) {
            log.info("Creating default admin user...");
            
            Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));
            
            User adminUser = User.builder()
                    .username("admin")
                    .email("admin@daffy.edu")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("System")
                    .lastName("Administrator")
                    .bio("System Administrator for Daffy Social Network")
                    .status(User.UserStatus.ACTIVE)
                    .enabled(true)
                    .locked(false)
                    .emailVerified(true)
                    .createdAt(LocalDateTime.now())
                    .roles(new HashSet<>(List.of(adminRole)))
                    .build();
            
            userRepository.save(adminUser);
            log.info("Default admin user created successfully: admin/admin123");
        }
    }
}
