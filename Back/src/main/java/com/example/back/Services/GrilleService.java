package com.example.back.Services;

import com.example.back.Entities.Grille;
import com.example.back.Entities.Tache_journal;

import java.util.List;

public interface GrilleService {

    Grille addGrille(Grille grille);

    Grille updateGrille(Long idGrille, Grille grille) ;

    Grille findGrilleById(Long idGrille);


    List<Grille> findAll();

    void removeGrille (Long idGrille);
}
