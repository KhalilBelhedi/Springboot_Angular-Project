package com.example.back.ServiceImp;


import com.example.back.Entities.*;
import com.example.back.Repositories.SujetRepository;
import com.example.back.Repositories.UserRepository;
import com.example.back.Services.SujetService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SujetServiceImp implements SujetService {

    @Autowired
    private SujetRepository sujetRepository;
    @Autowired
    private UserRepository userRepository ;


    @Override
    public Sujet addSujet(Sujet sujet,long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        sujet.setUser(user);
        return sujetRepository.save(sujet);
    }

    @Override
    public Sujet updateSujet(Sujet updatedSujet, long idSujet) {
        // Retrieve the existing sujet from the repository using the provided ID
        Sujet existingSujet = sujetRepository.findById(idSujet)
                .orElseThrow(() -> new EntityNotFoundException("Sujet not found"));

        // Update only the non-null fields from the updated sujet
        if (updatedSujet.getTitre() != null) {
            existingSujet.setTitre(updatedSujet.getTitre());
        }
        if (updatedSujet.getDescription() != null) {
            existingSujet.setDescription(updatedSujet.getDescription());
        }
        if (updatedSujet.getDuree() != 0) {
            existingSujet.setDuree(updatedSujet.getDuree());
        }
        if (updatedSujet.getLieu() != null) {
            existingSujet.setLieu(updatedSujet.getLieu());
        }
        if (updatedSujet.getNbretudiant() != 0) {
            existingSujet.setNbretudiant(updatedSujet.getNbretudiant());
        }
        if (updatedSujet.getRequirements() != null) {
            existingSujet.setRequirements(updatedSujet.getRequirements());
        }
        if (updatedSujet.getTypesujet() != null) {
            existingSujet.setTypesujet(updatedSujet.getTypesujet());
        }

        // Save the updated sujet
        return sujetRepository.save(existingSujet);
    }


    @Override
    public List<Sujet> findAll() {
        return (List<Sujet>)sujetRepository.findAll();
    }

    @Override
    public Sujet findById(long idSujet) {
        // Find and return the sujet with the provided idSujet
        return sujetRepository.findById(idSujet)
                .orElseThrow(() -> new EntityNotFoundException("Sujet with id " + idSujet + " not found."));
    }

    @Override

    public List<Sujet> findAllSortedByMailentreprisee() {
        return sujetRepository.findByOrderByMailentrepriseAsc(); // Corrected method name to match the repository
    }

    @Override
    public List<Sujet> findAllSortedByMailentreprise(String classe) {
        char firstLetter = classe.charAt(0); // Récupérer la première lettre de la classe

        switch (firstLetter) {
            case '1':
                return sujetRepository.findByTypesujet(com.example.internship_management.Entities.Enums.Typesujet.STAGE_FORMATION_HUMAINE_SOCIALE);
            case '3':
                return sujetRepository.findByTypesujet(com.example.internship_management.Entities.Enums.Typesujet.STAGE_IMMERSION_ENTREPRISE);
            case '4':
                return sujetRepository.findByTypesujet(com.example.internship_management.Entities.Enums.Typesujet.STAGE_INGENIEUR);
            default:
                return sujetRepository.findByOrderByMailentrepriseAsc();
        }

    }
    @Override
    public List<Sujet> searchSujets(String searchTerm) {
        return sujetRepository.findByNomentrepriseContainingIgnoreCaseOrRequirementsContainingIgnoreCaseOrDescriptionContainingIgnoreCase(searchTerm, searchTerm, searchTerm);
    }


    @Override
    public void delete(long idSujet) {
        // Check if the idSujet is > 0)
        if (idSujet <= 0) {
            throw new IllegalArgumentException("Invalid idSujet. Please provide a positive non-zero value.");
        }

        // Check if idSujet exists in the DB
        if (!sujetRepository.existsById(idSujet)) {
            throw new EntityNotFoundException("Sujet with id " + idSujet + " not found.");
        }

        // Delete the sujet
        sujetRepository.deleteById(idSujet);
    }

    public List<Sujet> findByNbretudiantOrderByNbretudiantDesc() { return sujetRepository.findByOrderByNbretudiantDesc(); }
    public List<Sujet> findByNbretudiantOrderByNbretudiantAsc() { return sujetRepository.findByOrderByNbretudiantAsc();  }

    public List<Sujet> findByDureeOrderByDureeDesc() { return sujetRepository.findByOrderByDureeDesc();  }

    public List<Sujet> findByDureeOrderByDureeAsc() { return sujetRepository.findByOrderByDureeAsc();  }



    public List<Sujet> findAllByUser(User user) {
        return sujetRepository.findAllByUser(user);
    }



}
