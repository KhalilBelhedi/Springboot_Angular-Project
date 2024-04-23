package com.example.back.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Cascade;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idPost;
    String contenu_Post;
    String sujet_Post;
    boolean isAnonymous;
    LocalDateTime date_Post;
    @JsonIgnore
    @OneToMany(mappedBy = "post" , cascade = CascadeType.ALL, orphanRemoval = true)
    @Cascade({org.hibernate.annotations.CascadeType.ALL, org.hibernate.annotations.CascadeType.DELETE_ORPHAN})
    private Set<Commentaire> commentaires;
    String profileImage ;// Add this attribute for the profile image
    int likes = 0; // Initialize likes to 0
    int dislikes = 0; // Initialize dislikes to 0
    boolean isLikedByCurrentUser = false; // Initialize to false
    boolean isDislikedByCurrentUser = false; // Initialize to false



}