package com.example.back.Entities;

import com.example.back.Entities.Enums.Typefile;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class File {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Setter(AccessLevel.NONE)
        Long idfile;
        String fileurl;
        @Enumerated(EnumType.STRING)
        Typefile type;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

     /*   @Lob
        byte[] filecontent;

*/
    }
