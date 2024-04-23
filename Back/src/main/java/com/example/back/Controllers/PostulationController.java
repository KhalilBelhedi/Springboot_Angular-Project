package com.example.back.Controllers;

import com.example.back.Entities.*;
import com.example.back.Entities.Enums.UserRole;
import com.example.back.Repositories.PostulationRepository;
import com.example.back.Repositories.SujetRepository;
import com.example.back.Repositories.UserRepository;
import com.example.back.ServiceImp.EmailServiceImp;
import com.example.back.Services.PostulationService;
import com.example.back.Services.StageService;
import com.example.back.Services.SujetService;
import com.example.back.Services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date; // Import Date class
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/services/postulation")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class PostulationController {

    private final SujetRepository sujetRepository;
    private final PostulationRepository postulationRepository;
    private final UserRepository userRepository;

    private final SujetService sujetService;
    private final PostulationService postulationService;
    private  final StageService stageService;

    @Autowired
    private EmailServiceImp emailService;
    private final UserService userService;

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendSimpleEmail(emailRequest.getToEmail(), emailRequest.getSubject(), emailRequest.getBody());
    }

    @PostMapping("/add/{sujetId}/{userId}")
    public Postulation addPostulation(@PathVariable Long sujetId, @PathVariable Long userId, @RequestBody Postulation postulation) {
        // Gérer l'erreur si l'ID du sujet est manquant
        if (sujetId == null) {
            throw new IllegalArgumentException("sujetId manquant");
        }

        // Gérer l'erreur si l'ID de l'utilisateur est manquant
        if (userId == null) {
            throw new IllegalArgumentException("userId manquant");
        }

        // Récupérer l'utilisateur correspondant à partir de l'ID de l'utilisateur
        User user = userRepository.findById(userId).orElse(null);

        // Récupérer le sujet correspondant à partir de l'ID du sujet
        Sujet sujet = sujetRepository.findById(sujetId).orElse(null);

        // Gérer l'erreur si le sujet n'est pas trouvé
        if (sujet == null) {
            throw new IllegalArgumentException("Sujet non trouvé");
        }

        // Définir le statut par défaut à 0 s'il n'est pas fourni dans le corps de la requête
        if (postulation.getStatus() == 0) {
            postulation.setStatus(0);
        }

        // Récupérer le type de stage pour le sujet
        String typeSujet = sujet.getTypesujet().toString();

        // Vérifier la période selon le type de stage
        int minimumDurationInDays = 0;
        if ("STAGE_FORMATION_HUMAINE_SOCIALE".equals(typeSujet)) {
            minimumDurationInDays = 30;
        } else if ("STAGE_IMMERSION_ENTREPRISE".equals(typeSujet)) {
            minimumDurationInDays = 45;
        } else if ("STAGE_INGENIEUR".equals(typeSujet)) {
            minimumDurationInDays = 60;
        }

        // Valider la période
        if (!isValidPeriod(postulation.getDatedeb(), postulation.getDatefin(), minimumDurationInDays)) {
            throw new IllegalArgumentException("Période invalide"); // Gérer l'erreur si la période n'est pas valide
        }

        // Définir le sujet et l'utilisateur pour la postulation
        postulation.setSujet(sujet);
        postulation.setUser(user);

        // Enregistrer la postulation dans la base de données et la renvoyer
        return postulationRepository.save(postulation);
    }



    //milliseconds to days.
    //(1000 milliseconds * 60 seconds * 60 minutes * 24 hours).
   private boolean isValidPeriod(Date dateDebut, Date dateFin, int minimumDurationInDays) {
        long differenceInTime = dateFin.getTime() - dateDebut.getTime();
        long differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays >= minimumDurationInDays;
    }






    @GetMapping("/byAccepted")
    public List<Postulation> filterByAccepted() {
        List<Postulation> acceptedPostulations = postulationService.getPostulationsByStatus(1);
        return acceptedPostulations;
    }

    @GetMapping("/byRefused")
    public List<Postulation> filterByRefused() {
        List<Postulation> refusedPostulations = postulationService.getPostulationsByStatus(2);
        return refusedPostulations;
    }

    @GetMapping("/byAttente")
    public List<Postulation> filterByAttente() {
        List<Postulation> waitingPostulations = postulationService.getPostulationsByStatus(0);
        return waitingPostulations;
    }




    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{idP}")
    public Postulation updatePostulation(@RequestBody Postulation postulation, @PathVariable long idP) {
        return postulationService.updatePostulation(postulation, idP);
    }


    @GetMapping
    public List<Postulation> findAll() {
        return postulationService.findAll();
    }


    @GetMapping("/{idP}")
    public Postulation getById(@PathVariable long idP){
        return postulationService.findById(idP);
    }

    @DeleteMapping("/{idP}")
    public void delete(@PathVariable long idP) {
        postulationService.delete(idP);
    }



    @GetMapping("/sujet/{id}")
    public Sujet getSujetById(@PathVariable("id") Long sujetId) {
        Sujet sujet = sujetService.findById(sujetId);
        if (sujet != null) {
            return sujet;
        } else {
            return null;
        }
    }


    @GetMapping("/typesujet/{id}")
    public String getSujetTypeById(@PathVariable("id") Long sujetId) {
        Sujet sujet = sujetService.findById(sujetId);
        if (sujet != null) {
            return sujet.getTypesujet().toString();
        } else {
            return null;
        }
    }

    @GetMapping("/attente/{idadmin}")
    public List<Postulation> getPostulationsAttente(@PathVariable Long idadmin) {
        User user = userService.findById(idadmin);

        if (user != null) {
            if (user.getRole() == UserRole.SuperAdmin || user.getRole() == UserRole.Agentesprit) {
                return postulationService.getPostulationsByStatus(0);
            } else if (user.getRole() == UserRole.Agententreprise) {
                return postulationService.getPostulationsByStatusAndUserId(0, idadmin);
            }
        }

        return new ArrayList<>();

    }





    @GetMapping("/byIdSujetAndAttente/{sujetId}")
    public List<Postulation> getPostulationsByIdSujetAndAttente(@PathVariable Long sujetId) {
        return postulationService.getPostulationsBySujetIdAndAttente(sujetId);
    }



    @PutMapping("/confirm-postulation/{idP}/{userRole}")
    public Postulation confirmPostulation(@PathVariable long idP , @PathVariable String userRole) {
        log.info("idP: " + idP);
        log.info("idadmin: " + userRole);
        Postulation postulation = postulationService.findById(idP);
        if (userRole.equals("Agententreprise")) {
            postulation.setStatusentr(1);
            postulationService.updatePostulation(postulation, idP);
        } else if (userRole.equals("SuperAdmin") || userRole.equals("Agentesprit")) {
            postulation.setStatus(1);
            postulationService.updatePostulation(postulation, idP);
        }

            if (postulation.getStatusentr() == 1 && postulation.getStatus() == 1) {
                postulationService.updatePostulation(postulation, idP);
                // Send confirmation email to the student
                sendConfirmationEmail(postulation);
                Stage stage = new Stage();
                stageService.addStage(stage);
            }

        return postulation;
    }


    @PutMapping("/reject-postulation/{idP}/{userRole}")
    public Postulation rejectPostulation(@PathVariable long idP, @PathVariable String userRole) {

        log.info("idP: " + idP);
        log.info("idadmin: " + userRole);
        Postulation postulation = postulationService.findById(idP);
        if (userRole.equals("Agententreprise")) {
            postulation.setStatusentr(2);
            postulationService.updatePostulation(postulation, idP);
        } else if (userRole.equals("SuperAdmin") || userRole.equals("Agentesprit")) {
            postulation.setStatus(2);
            postulationService.updatePostulation(postulation, idP);
        }

        if (postulation.getStatusentr() == 2 && postulation.getStatus() == 2) {
            postulationService.updatePostulation(postulation, idP);
            // Send confirmation email to the student
            sendRejectionEmail(postulation);

        }

        return postulation;
    }

    private void sendConfirmationEmail(Postulation postulation) {
        String toEmail = postulation.getUser().getEmail();
        String subject = "Confirmation of your internship application";
        String body = "Hello " + postulation.getUser().getFirstName() + " " + postulation.getUser().getLastName() +
                ", your internship application for the company " + postulation.getSujet().getNomentreprise() +
                " has been accepted.";
        emailService.sendSimpleEmail(toEmail, subject, body);
    }

    private void sendRejectionEmail(Postulation postulation) {
        String toEmail = postulation.getUser().getEmail();
        String subject = "Rejection of your internship application";
        String body = "Hello " + postulation.getUser().getFirstName() + " " + postulation.getUser().getLastName() +
                ", your internship application for the company " + postulation.getSujet().getNomentreprise() +
                " has been rejected.";
        emailService.sendSimpleEmail(toEmail, subject, body);
    }



}
