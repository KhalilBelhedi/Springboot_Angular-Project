package com.example.back.Services;

import com.example.back.Entities.Evaluation;
import com.example.back.Entities.Tache_journal;

import java.util.List;
import java.util.Set;

public interface EvaluationService {

    Set<Evaluation> addEvaluationAndAssignToJournal (long id_Journal);

    List<Evaluation> findAllEvaluationsByIdJournal(Long id_Journal);


    Evaluation findEvaluationById(Long idEvaluation);

    List<Evaluation> findAll();

    Long updateEvaluation(Long idEvaluation , Evaluation updtevaluation ) ;


}
