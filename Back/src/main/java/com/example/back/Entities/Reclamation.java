package com.example.back.Entities;

import com.example.back.Entities.Enums.Statut_reclamation;
import com.example.back.Entities.Enums.Type_reclamation;
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
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long id_Reclamation;

    String description_Reclamation;

    @Enumerated(EnumType.STRING)
    Type_reclamation typeReclamation;

    String title;

    LocalDateTime date_Reclamation;

    @PrePersist
    public void prePersist() {
        this.date_Reclamation = LocalDateTime.now();
    }

    @Enumerated(EnumType.STRING)
    Statut_reclamation statutReclamation;

    @OneToOne ()
    Reponse reponse;
}
