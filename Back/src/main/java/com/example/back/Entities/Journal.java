package com.example.back.Entities;

//import com.example.internship_management.Entities.Enums.Note_evaluation;
//import com.example.internship_management.Entities.Enums.Type_file;
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
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idJournal;
    String remarque;
    float totalNoteEvaluation;
    //@Column(nullable = false)
    boolean journalIsValid = false;

    @JsonIgnore
    @OneToOne (mappedBy = "journal")
    private Stage stage;


    @OneToMany(mappedBy = "journal")  //,cascade = CascadeType.PERSIST)
    private Set<Tache_journal> tache_journal;




    @OneToMany
    private Set<Evaluation> evaluations;

}
