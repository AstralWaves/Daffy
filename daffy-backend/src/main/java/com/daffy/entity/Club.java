package com.daffy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "clubs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Club {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    @Size(max = 255)
    private String imageUrl;

    @Size(max = 255)
    private String coverImageUrl;

    @Enumerated(EnumType.STRING)
    private ClubType type;

    @Enumerated(EnumType.STRING)
    private ClubStatus status;

    @Enumerated(EnumType.STRING)
    private ClubPrivacy privacy;

    private int maxMembers = 10000;
    private boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "club_members",
            joinColumns = @JoinColumn(name = "club_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private Set<User> members = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "club_moderators",
            joinColumns = @JoinColumn(name = "club_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private Set<User> moderators = new HashSet<>();

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Post> posts = new HashSet<>();

    public enum ClubType {
        ACADEMIC, SPORTS, CULTURAL, TECHNICAL, SOCIAL, OTHER
    }

    public enum ClubStatus {
        ACTIVE, INACTIVE, SUSPENDED, DELETED
    }

    public enum ClubPrivacy {
        PUBLIC, PRIVATE, SECRET
    }

    public int getMemberCount() {
        return members.size();
    }

    public boolean isMember(User user) {
        return members.contains(user);
    }

    public boolean isModerator(User user) {
        return moderators.contains(user);
    }

    public boolean isOwner(User user) {
        return owner.equals(user);
    }

    public void addMember(User user) {
        this.members.add(user);
        user.getClubs().add(this);
    }

    public void removeMember(User user) {
        this.members.remove(user);
        user.getClubs().remove(this);
    }

    public void addModerator(User user) {
        this.moderators.add(user);
    }

    public void removeModerator(User user) {
        this.moderators.remove(user);
    }
}
