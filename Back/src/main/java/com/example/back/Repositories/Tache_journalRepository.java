package com.example.back.Repositories;

import com.example.back.Entities.Tache_journal;
import org.hibernate.sql.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface Tache_journalRepository extends JpaRepository<Tache_journal, Long> {
   // List<Tache_journal> findByJournal_Id_JournalOrderById_tacheAsc(Long id_Journal);

   // List<Tache_journal> findByJournal_Id_Journal(Long id_Journal);
  // List<Tache_journal> findByJournal_IdJournalOrderByIdtacheAsc(Long idJournal);

   List<Tache_journal> findByJournal_IdJournal(Long idJournal);

   List<Tache_journal> findByJournal_IdJournalOrderByIdtacheAsc(Long idJournal);

   @Query("select t from Tache_journal t where t.journal.idJournal = ?1 and t.isValid = true order by t.idtache")
   List<Tache_journal> findByJournal_IdJournalAndIsValidTrueOrderByIdtacheAsc(Long idJournal);

   @Query("select t from Tache_journal t where t.journal.idJournal = ?1 and t.isValid = false order by t.idtache")
   List<Tache_journal> findByJournal_IdJournalAndIsValidFalseOrderByIdtacheAsc(Long idJournal);



  /* @Transactional
   @Modifying
   @Query("update Tache_journal t set t.isValid = 1 where t.idtache = ?1")
   int updateIsValidByIdtache(Long idtache);*/

   // findById_journalOrderByIdtache





}