package com.example.back.Services;

import com.example.back.Entities.Postulation;
import com.example.back.Entities.Sujet;

import java.util.List;
import java.util.Optional;

public interface PostulationService {
    Postulation addPostulation(Postulation postulation);
    Postulation updatePostulation(Postulation updatedPostulation, long idP)    ;
    List<Postulation> findAll();
    Postulation findById (long idP);
     void delete (long idP);
     List<Postulation> getPostulationsByStatus(int status);

    String getSujetTypeById(long sujetId);

    List<Postulation> getPostulationsBySujetIdAndAttente(Long sujetId);

    List<Postulation> getPostulationsByStatusAndUserId(int status, Long userId);


}
