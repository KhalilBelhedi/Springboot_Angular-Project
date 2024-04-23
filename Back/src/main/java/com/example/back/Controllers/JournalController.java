package com.example.back.Controllers;

import com.example.back.Entities.Journal;
import com.example.back.ServiceImp.JournalServiceImp;
import com.example.back.Services.JournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/services/journal")
@CrossOrigin(origins = "http://localhost:4200")

public class JournalController {

    public final JournalService journalService;


    @PostMapping
    public Journal addJournal(@RequestBody Journal journal) {
        return journalService.addJournal(journal);
    }

    @PostMapping("/{id_Stage}")
    public Journal addJournalAndAssignToStage(@RequestBody Journal journal, @PathVariable long id_Stage) {

        return journalService.addJournalAndAssignToStage(journal, id_Stage);
    }


    @PutMapping
    public Journal updateJournal(@RequestBody Journal journal) {

        return journalService.updateJournal(journal);
    }

    @GetMapping("/{id_Journal}")
    public Journal findById(@PathVariable Long id_Journal) {

       // journalService.calculTotalNote(id_Journal);
        return journalService.findById(id_Journal);
    }


    @GetMapping("/getjournalbyencadrant/{mailEncadrant}")
    public Set<Journal> GetJournalByEncadrant(@PathVariable String mailEncadrant) {

     return journalService.GetJournalByEncadrant(mailEncadrant);
    }


    @PutMapping("/calculTotalNote/{id_Journal}")
    public Journal calculTotalNote(Long id_Journal) {

        return journalService.calculTotalNote(id_Journal);
    }

    @PutMapping("/ValidJournal/{id_Journal}")
    public Journal ValidJournal(Long id_Journal) {
        return journalService.ValidJournal(id_Journal);
    }

    @GetMapping("/getjournalbyIdStage/{idStage}")
    public Journal GetJournalByIdStage(@PathVariable Long idStage)
    {
        return journalService.GetJournalByIdStage(idStage);}
}