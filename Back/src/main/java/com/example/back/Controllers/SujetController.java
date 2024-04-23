package com.example.back.Controllers;

import com.example.back.Entities.*;
import com.example.back.Entities.Enums.UserRole;
import com.example.back.Services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/services/sujet")
@CrossOrigin(origins = "http://localhost:4200")
public class SujetController {



    private final SujetService sujetService;
    private final UserService userService;

    @PostMapping("/add/{idadmin}")
    public Sujet addSujet(@RequestBody Sujet sujet , @PathVariable Long idadmin) {
        return sujetService.addSujet(sujet, idadmin);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{idSujet}")
    public Sujet updateSujet(@RequestBody Sujet sujet, @PathVariable long idSujet) {
        return sujetService.updateSujet(sujet, idSujet);
    }


    @GetMapping("/affich/{idadmin}")
    public List<Sujet> findAll(@PathVariable Long idadmin) {
        User user = userService.findById(idadmin);

        if (user != null) {
            if (user.getRole() == UserRole.SuperAdmin || user.getRole() == UserRole.Agentesprit) {
                return sujetService.findAllSortedByMailentreprisee();
            } else if (user.getRole() == UserRole.Agententreprise) {
                return sujetService.findAllByUser(user);
            }
        }

        return new ArrayList<>();
    }



    @GetMapping("/classe/{classena}")
    public List<Sujet> findAll(@PathVariable String classena) {

        return sujetService.findAllSortedByMailentreprise(classena);
    }




    @GetMapping("/search")
    public List<Sujet> searchSujets(@RequestParam String searchTerm) {
        return sujetService.searchSujets(searchTerm);
    }



    @GetMapping("/{idSujet}")
    public Sujet getById(@PathVariable long idSujet){
        return sujetService.findById(idSujet);
    }

    @DeleteMapping("/{idSujet}")
    public void delete(@PathVariable long idSujet) {
        sujetService.delete(idSujet);
    }


    @GetMapping("/filter/byNbretudiantDesc")
    public List<Sujet> filterByNbretudiantDescending() {
        return sujetService.findByNbretudiantOrderByNbretudiantDesc();
    }
    @GetMapping("/filter/byNbreEtudiantAsc")
    public List<Sujet> filterByNbretudiantAscending() {
        return sujetService.findByNbretudiantOrderByNbretudiantAsc();
    }

    @GetMapping("/filter/byDureeDesc")
    public List<Sujet> filterByDureeDescending() {
        return sujetService.findByDureeOrderByDureeDesc();
    }

    @GetMapping("/filter/byDureeAsc")
    public List<Sujet> filterByDureeAscending() {
        return sujetService.findByDureeOrderByDureeAsc();
    }


}
