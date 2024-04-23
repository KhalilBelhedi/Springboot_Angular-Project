package com.example.back.Controllers;

import com.example.back.Entities.Tache_journal;
import com.example.back.ServiceImp.Tache_journalServiceImp;
import com.example.back.Services.JournalService;
import com.example.back.Services.Tache_journalService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/services/tache_journal")
@CrossOrigin(origins = "http://localhost:4200")


public class Tache_journalController {


        private  final Tache_journalService tache_journalService;
        private final JournalService journalService;



        @PostMapping
        public Tache_journal addTache_Journal(@RequestBody Tache_journal tache_journal) {
            return tache_journalService.addTache_Journal(tache_journal);
        }

        @PostMapping("/{id_Journal}")
        public Tache_journal addTache_JournalAndAssignToJournal(@RequestBody Tache_journal tache_journal, @PathVariable Long id_Journal) {


            return tache_journalService.addTache_JournalAndAssignToJournal(tache_journal, id_Journal);
        }

        @GetMapping("/{id_tache}")
        public Tache_journal findTacheById(@PathVariable long id_tache) {
            return  tache_journalService.findTacheById(id_tache);
        }

        @GetMapping
        public List<Tache_journal> findAll() {
            return tache_journalService.findAll();
        }


     /*   @PutMapping
        public Tache_journal updateTache_Journal(@RequestBody Tache_journal tache_journal) {
            return  tache_journalService.updateTache_Journal(tache_journal);
        }
*/
    @PutMapping("/updatetache/{idtache}")
    public ResponseEntity<Tache_journal> updateTache_Journal(@PathVariable Long idtache, @RequestBody Tache_journal updttache) {
        try {
            Tache_journal updated = tache_journalService.updateTache_Journal(idtache, updttache);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/updateIsValidtache/{idtache}")
    public Tache_journal updateIsValidByIdtache(@PathVariable Long idtache , @RequestBody Tache_journal updtvalid ) {
       return   tache_journalService.updateIsValidByIdtache(idtache , updtvalid );
    }

    @PutMapping("/updateNonValidtache/{idtache}")
    public Tache_journal updateNonValidByIdtache(@PathVariable Long idtache,@RequestBody Tache_journal updtnonvalid) {
        return  tache_journalService.updateNonValidByIdtache(idtache, updtnonvalid );
    }


@GetMapping("/GetTachebyJournal/{id_Journal}")
    public List<Tache_journal> findAllTachesByIdJournal(@PathVariable Long id_Journal) {
           return  tache_journalService.findAllTachesByIdJournal(id_Journal);
    }

    @GetMapping("/GetTacheValidbyJournal/{id_Journal}")
    public List<Tache_journal> AllTachesValidByIdJournal(Long idjournal) {
        return  tache_journalService.AllTachesValidByIdJournal(idjournal);
    }

    @GetMapping("/GetTacheNonValidbyJournal/{id_Journal}")
    public List<Tache_journal> AllTachesNonValidByIdJournal(Long idjournal) {
        return  tache_journalService.AllTachesNonValidByIdJournal(idjournal);
    }

    @DeleteMapping("/removetache/{idtache}")
    public  boolean removeTache(@PathVariable Long idtache) {

        tache_journalService.removeTache(idtache);
        return true;
    }

    }


