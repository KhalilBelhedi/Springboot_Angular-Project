package com.example.back.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Postulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idp;
    Date datedeb;
    Date datefin;
    String region;
    String titrecandidature;
    String lettremotivation;
    int status;
    int statusentr;
    String comm;

    @ManyToOne
    @JoinColumn(name = "iduser")
    private User user;

    @ManyToOne
    @JoinColumn(name = "idsujet")
    private Sujet sujet;


}
