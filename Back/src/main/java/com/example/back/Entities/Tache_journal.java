package com.example.back.Entities;

import com.example.back.Entities.Enums.Statut;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Tache_journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idtache;
    String descriptiontache;
    LocalDateTime datetache;

    @Enumerated(EnumType.STRING)
    Statut status;


    boolean isValid ;


    @ManyToOne   //(cascade = CascadeType.PERSIST)
    @JsonIgnore
    Journal journal;
}
