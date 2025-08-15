package com.daffy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "roles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"users"}) // Exclude users from hashCode/equals to prevent LazyInitializationException
@ToString(exclude = {"users"}) // Exclude users from toString to avoid lazy loading issues
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleName name;

    @Size(max = 255)
    private String description;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public enum RoleName {
        ROLE_USER,
        ROLE_MODERATOR,
        ROLE_ADMIN,
        ROLE_SUPER_ADMIN
    }
}