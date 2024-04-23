package com.example.back.Services;

import com.example.back.Entities.Journal;

import java.util.Set;

public interface JournalService {

    Journal addJournal(Journal journal) ;

    Journal updateJournal(Journal journal) ;

    Set<Journal> findAll();

    Journal findById(Long id_Journal);



    Journal addJournalAndAssignToStage(Journal journal , Long id_Stage);

    Set<Journal> GetJournalByEncadrant(String mailEncadrant);

    Journal calculTotalNote(Long id_Journal);

    Journal ValidJournal(Long id_Journal);

    Journal GetJournalByIdStage(Long idStage);
}
