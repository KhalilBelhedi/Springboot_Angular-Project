package com.example.back.ServiceImp;

import com.example.back.Entities.Evaluation;
import com.example.back.Entities.Journal;
import com.example.back.Entities.Tache_journal;
import com.example.back.Repositories.EvaluationRepository;
import com.example.back.Repositories.GrilleRepository;
import com.example.back.Repositories.JournalRepository;
import com.example.back.Services.EvaluationService;
import com.example.back.Services.JournalService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
@Slf4j
@Service
@RequiredArgsConstructor
public class EvaluationServiceImp implements EvaluationService {

 private final EvaluationRepository evaluationRepos;
 private final GrilleRepository grilleRepos;
 private final JournalRepository journalRepos;

 //private final JournalService journalService;

 @Override
 public Set<Evaluation> addEvaluationAndAssignToJournal( long id_Journal) {

  Journal journal = journalRepos.findById(id_Journal).orElseThrow(
          () -> new IllegalArgumentException("Journal n'existe pas"));

  log.info(grilleRepos.findAll().toString());

  Set<Evaluation> evaluations = new HashSet<Evaluation>();


  grilleRepos.findAll().forEach(grille ->  {

Evaluation ev = new Evaluation();
        ev.setDescription(grille.getDescriptionGrille());
               ev.setNoteEvaluation(0);

               evaluations.add(ev);




        });

 evaluationRepos.saveAll(evaluations);
     journal.setEvaluations(evaluations);
     journalRepos.save(journal);

  return evaluations ;
 }

    @Override
    public List<Evaluation> findAllEvaluationsByIdJournal(Long id_Journal) {

        Journal journal = journalRepos.findById(id_Journal).orElseThrow(
                () -> new IllegalArgumentException("Journal n'existe pas"));

        return evaluationRepos.findAllEvaluationsByIdJournal(id_Journal);
    }

    @Override
    public Evaluation findEvaluationById(Long idEvaluation) {
        return evaluationRepos.findById(idEvaluation).orElseThrow(null);
    }

    @Override
    public List<Evaluation> findAll() {
        return evaluationRepos.findAll();
    }

    @Override
    public Long updateEvaluation(Long idEvaluation, Evaluation updtevaluation) {

        Evaluation existingEvaluation = evaluationRepos.findById(idEvaluation)
                .orElseThrow(() -> new EntityNotFoundException("Evaluation non trouvée avec l'ID : " + idEvaluation));

        if (!Objects.equals(updtevaluation.getAppreciation(), existingEvaluation.getAppreciation())){

            existingEvaluation.setAppreciation(updtevaluation.getAppreciation());
        }
         evaluationRepos.save(existingEvaluation);

        switch (existingEvaluation.getAppreciation()) {

            case EXCELLENT -> existingEvaluation.setNoteEvaluation(4);
            case TRESBON -> existingEvaluation.setNoteEvaluation(3);
            case SATISFAISANT -> existingEvaluation.setNoteEvaluation(2);
            case INSATISFAISANT  -> existingEvaluation.setNoteEvaluation(1);
        }
        evaluationRepos.save(existingEvaluation);
       Long journalIdByEvaluationId = evaluationRepos.findJournalIdsByEvaluationId(existingEvaluation.getIdEvaluation());
       // journalService.calculTotalNote(journalIdsByEvaluationId);
        return journalIdByEvaluationId ;
    }


}
