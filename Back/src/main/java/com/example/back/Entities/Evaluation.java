package com.example.back.Entities;

import com.example.back.Entities.Enums.Appreciation;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idEvaluation;
    float noteEvaluation;
    String description;
    @Enumerated(EnumType.STRING)
    Appreciation appreciation;

}
