package com.example.back.Repositories;

import com.example.back.Entities.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

  //  @Query("select e from Evaluation e where e.appreciation = ")


    @Query(value = "SELECT *  \n" +
        "FROM evaluation e \n" +
            "JOIN journal_evaluations ej ON e.id_evaluation = ej.evaluations_id_evaluation \n" +
            "JOIN journal j ON  j.id_journal = ej.journal_id_journal \n" +
            " \n" +
            "WHERE j.id_journal=?1 ", nativeQuery = true)
    List<Evaluation>findAllEvaluationsByIdJournal(Long id_Journal);

    @Query(  value = "SELECT je.journal_id_journal FROM journal_evaluations je WHERE je.evaluations_id_evaluation = :evaluationId",
            nativeQuery = true
    )
    Long findJournalIdsByEvaluationId(Long evaluationId);

}