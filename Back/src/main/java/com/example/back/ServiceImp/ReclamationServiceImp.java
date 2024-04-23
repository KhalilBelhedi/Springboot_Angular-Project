package com.example.back.ServiceImp;

import com.example.back.Entities.Enums.Type_reclamation;
import com.example.back.Entities.Reclamation;
import com.example.back.Entities.Reponse;
import com.example.back.Repositories.ReclamationRepository;
import com.example.back.Services.ReclamationService;
import com.example.back.Entities.Enums.Statut_reclamation;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReclamationServiceImp implements ReclamationService {
    private final ReclamationRepository reclamationRepository;

    @Override
    public Reclamation addReclamation(Reclamation reclamation) {
        reclamation.setStatutReclamation(Statut_reclamation.valueOf("ENATTENTE"));
        return reclamationRepository.save(reclamation);
    }

    @Override
    public Reclamation updateReclamation(long id_Reclamation, Reclamation updatedReclamation) {
        // Recherche de la réclamation existante par son identifiant
        Reclamation existingReclamation = reclamationRepository.findById(id_Reclamation)
                .orElseThrow(() -> new EntityNotFoundException("Réclamation non trouvée avec l'ID : " + id_Reclamation));

        // Mettre à jour les champs de la réclamation existante avec les valeurs de la réclamation mise à jour
        existingReclamation.setTitle(updatedReclamation.getTitle());
        existingReclamation.setTypeReclamation(updatedReclamation.getTypeReclamation());
        existingReclamation.setDescription_Reclamation(updatedReclamation.getDescription_Reclamation());
        existingReclamation.setStatutReclamation(updatedReclamation.getStatutReclamation());
        existingReclamation.setReponse(updatedReclamation.getReponse());

        // Enregistrer la réclamation mise à jour dans la base de données
        return reclamationRepository.save(existingReclamation);
    }

    @Override
    public List<Reclamation> findAll() {
        return (List<Reclamation>) reclamationRepository.findAll();
    }

    @Override
    public Reclamation findById(long id_reclamation) {
        return reclamationRepository.findById(id_reclamation).orElse(null);
    }

    @Override
    public void delete(long id_reclamation) {
        reclamationRepository.deleteById(id_reclamation);
    }

    @Override
    public Map<Type_reclamation, Long> countByType() {
        List<Reclamation> reclamations = reclamationRepository.findAll();
        Map<Type_reclamation, Long> typeCounts = reclamations.stream()
                .filter(reclamation -> reclamation.getTypeReclamation() != null)
                .collect(Collectors.groupingBy(Reclamation::getTypeReclamation, Collectors.counting()));
        return typeCounts;
    }
}

