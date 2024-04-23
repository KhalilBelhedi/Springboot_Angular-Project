package com.example.back.ServiceImp;

import com.example.back.Entities.Evaluation;
import com.example.back.Entities.Journal;
import com.example.back.Entities.Stage;
import com.example.back.Entities.Tache_journal;
import com.example.back.Repositories.JournalRepository;
import com.example.back.Repositories.StageRepository;
import com.example.back.Services.EvaluationService;
import com.example.back.Services.JournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JournalServiceImp implements JournalService {
    private final JournalRepository journalRepos;
    private  final StageRepository stageRepos;

    private final EvaluationService evaluationService;


    @Override
    public Journal addJournal(Journal journal) {
        Set<Tache_journal> tjs = new HashSet<>();
        journal.setTache_journal(tjs);

        return journalRepos.save(journal);
    }

    @Override
    public Journal updateJournal(Journal journal) {
        return journalRepos.save(journal);


    }

    @Override
    public Set<Journal> findAll() {
        return (Set<Journal>) journalRepos.findAll();
    }

    @Override
    public Journal findById(Long id_Journal) {
        return journalRepos.findById(id_Journal).orElse(null) ;

    }

    @Override
    public Journal addJournalAndAssignToStage(Journal journal, Long id_Stage) {

        Stage stage = stageRepos.findById(id_Stage).orElse(null);
        Set<Tache_journal> tjs = new HashSet<>();
        journal.setTache_journal(tjs);
        journal.setJournalIsValid(false);



        journalRepos.save(journal);

        Set<Evaluation> eval = evaluationService.addEvaluationAndAssignToJournal(journal.getIdJournal());
        journal.setEvaluations(eval);

        journalRepos.save(journal);

        stage.setJournal(journal);
        stageRepos.save(stage);

        return journal;
    }

    @Override
    public Set<Journal> GetJournalByEncadrant(String mailEncadrant) {
        return journalRepos.findByStage_Convention_EmailEncadrantLike(mailEncadrant);
    }

    @Override
    public Journal calculTotalNote(Long id_Journal) {
        Journal journal = journalRepos.findById(id_Journal).orElse(null);
    //   double sum =0 ;
        if (journal != null) {
           // tache_journal.setJournal(journal);
            //tache_journalRepos.save(tache_journal);
           // journal.setTotalNoteEvaluation(0);

       // journal.getEvaluations().forEach(evaluation -> { journal.setTotalNoteEvaluation(journal.getTotalNoteEvaluation()+evaluation.getNoteEvaluation());});

            Set<Evaluation> evaluations = journal.getEvaluations();
            int numberOfEvaluations = evaluations.size();
            float maxScore = 4 * numberOfEvaluations;
            float normalizedTotal = 0;

            for (Evaluation evaluation : evaluations) {
                float  normalizedScore = (evaluation.getNoteEvaluation() / maxScore) * 20;

                normalizedTotal += normalizedScore;
            }
            String formattedTotal = String.format(Locale.US, "%.2f", normalizedTotal);
            journal.setTotalNoteEvaluation(Float.parseFloat(formattedTotal));

        }
        return journalRepos.save(journal);
    }

    @Override
    public Journal ValidJournal(Long id_Journal) {
     /*   Journal journal = journalRepos.findById(id_Journal).orElse(null);

    int m ;

        if (journal != null) {
            journal.getTache_journal().forEach(   tache_journal ->  {
                if (tache_journal.isValid()==true) {    }



            }) ;
            if (journal.getTache_journal().size()==i) { journal.setJournalIsValid(true);}



        }
        return journalRepos.save(journal);*/



        Journal journal = journalRepos.findById(id_Journal).orElse(null);

        if (journal != null) {
            boolean allTasksValid = true; // Variable pour suivre si toutes les tâches sont validées

            // Parcours de toutes les tâches du journal
            for (Tache_journal tache_journal : journal.getTache_journal()) {
                if (!tache_journal.isValid()) {
                    allTasksValid = false; // Si une tâche n'est pas validée, on met la variable à false
                    break; // Pas besoin de vérifier les autres tâches si une n'est pas validée
                }
            }

            // Si toutes les tâches sont validées, on met le journal comme validé
            if (allTasksValid) {
                journal.setJournalIsValid(true);
            }
            else if (!allTasksValid) {
                journal.setJournalIsValid(false);
            }
            if (journal.getTache_journal().size() == 0 ) {

                journal.setJournalIsValid(false);
            }
        }

        return journalRepos.save(journal);
    }

    @Override
    public Journal GetJournalByIdStage(Long idStage) {
        return this.journalRepos.findByStage_IdStage(idStage);
    }


}
