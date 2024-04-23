package com.example.back.ServiceImp;

import com.example.back.Entities.Grille;
import com.example.back.Entities.Tache_journal;
import com.example.back.Repositories.GrilleRepository;
import com.example.back.Services.GrilleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@RequiredArgsConstructor
@Service
public class GrilleServiceImp implements GrilleService {

    private  final GrilleRepository grilleRepository;
    @Override
    public Grille addGrille(Grille grille) {
        return grilleRepository.save(grille);
    }

    @Override
    public Grille findGrilleById(Long idGrille) {
        return grilleRepository.findById(idGrille).orElse(null);
    }

       @Override
    public Grille updateGrille(Long idGrille, Grille updtgrille) {
           Grille existingGrille = grilleRepository.findById(idGrille)
                   .orElseThrow(() -> new EntityNotFoundException("Grille non trouvée avec l'ID : " + idGrille));

           // Mettre à jour les champs de la tache existante avec les valeurs de la tache mise à jour
           if (!Objects.equals(updtgrille.getDescriptionGrille(), existingGrille.getDescriptionGrille()) &&
                   !"".equals(updtgrille.getDescriptionGrille()) && updtgrille.getDescriptionGrille() != null) {

               existingGrille.setDescriptionGrille(updtgrille.getDescriptionGrille());


           }
           return grilleRepository.save(existingGrille);

       }

           @Override
           public List<Grille> findAll () {
               return grilleRepository.findAll();
           }

           @Override
           public void removeGrille (Long idGrille){

               grilleRepository.deleteById(idGrille);

           }


       }
