package com.example.back.Repositories;

import com.example.back.Entities.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {


    Journal findByIdJournal(Long idJournal);

    @Query("select j from Journal j where j.stage.convention.emailEncadrant = ?1")
    Set<Journal> findByStage_Convention_EmailEncadrantLike(String emailEncadrant);

    Journal findByStage_IdStage(Long idStage);


}