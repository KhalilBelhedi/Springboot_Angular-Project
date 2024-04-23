package com.example.back.Services;



import com.example.back.Entities.Journal;
import com.example.back.Entities.Tache_journal;

import java.util.List;
import java.util.Set;

public interface Tache_journalService {

    Tache_journal addTache_Journal(Tache_journal tache_journal);

    Tache_journal addTache_JournalAndAssignToJournal(Tache_journal tache_journal, long id_Journal);

   // Tache_journal updateTache_Journal(Tache_journal tache_journal);
    Tache_journal updateTache_Journal(Long idtache, Tache_journal tache_journal) ;

    Tache_journal updateIsValidByIdtache(Long idtache , Tache_journal updtvalid ) ;


    Tache_journal updateNonValidByIdtache(Long idtache , Tache_journal updtnonvalid);


    Tache_journal findTacheById(long id_tache);



    List<Tache_journal> findAll();

    List<Tache_journal> findAllTachesByIdJournal(Long id_Journal);


    void removeTache (Long idtache);

    List<Tache_journal> AllTachesValidByIdJournal (Long idjournal);

    List<Tache_journal> AllTachesNonValidByIdJournal (Long idjournal);

}
