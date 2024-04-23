package com.example.back.Entities;

import com.example.back.Entities.Enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long id_User;
    String login;
    String email;
    String firstName;
    String lastName;
    @Enumerated(EnumType.STRING)
    UserRole role;
    int num_tel;
    String role_entreprise;
    String identifiant;
    String classe;
    String specialite;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private Set<Post> postSet;
    @OneToMany
    @ToString.Exclude
    private Set<Reclamation> reclamationSet;
    @OneToMany
    @ToString.Exclude
    private Set<File> fileSet;
    @OneToMany
    @ToString.Exclude
    private Set<Convention> conventionSet;
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Postulation> postulations;


}
