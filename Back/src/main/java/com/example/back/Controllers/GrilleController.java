package com.example.back.Controllers;


import com.example.back.Entities.Grille;
import com.example.back.Entities.Tache_journal;
import com.example.back.Services.GrilleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/services/grille")
@CrossOrigin(origins = "http://localhost:4200")
public class GrilleController {

    private final GrilleService grilleService ;


    @PostMapping
    public Grille addGrille(@RequestBody Grille grille) {
        return grilleService.addGrille(grille);
    }

    @PutMapping("/updateGrille/{idGrille}")
    public ResponseEntity<Grille> updateGrille(@PathVariable Long idGrille,@RequestBody Grille updtgrille) {
        //return grilleService.updateGrille(idGrille, updtgrille);

        try {
            Grille updated = grilleService.updateGrille(idGrille, updtgrille);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/GetAllGrille")
    public List<Grille> findAllGrille () {

        return grilleService.findAll();
    }


    @DeleteMapping("/removeGrille/{idGrille}")
    public boolean removeGrille (@PathVariable Long idGrille){
        grilleService.removeGrille(idGrille);
        return true;
    }




    }
