package com.example.back.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idStage;
    String sujetStage;
    float notestage;
    boolean archived;
    String nomFichierRapport;


    @OneToOne
    private Convention convention;


    @OneToOne
    private Journal journal;
}
