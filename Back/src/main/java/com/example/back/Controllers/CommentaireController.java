package com.example.back.Controllers;

import com.example.back.Entities.Commentaire;
import com.example.back.Entities.Post;
import com.example.back.ServiceImp.CommentaireServiceImp;
import com.example.back.Services.CommentaireService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;


import java.util.List;



@RequiredArgsConstructor
@RestController
@RequestMapping("/api/services/commentaire")
@CrossOrigin(origins = "http://localhost:4200")

public class CommentaireController {
    private final CommentaireService commentaireService;
    @GetMapping("/getcmtparid/{idcommentaire}")
    public Commentaire getCommentaireById(@PathVariable(value = "idcommentaire") Long idCommentaire) {
        Commentaire commentaire= commentaireService.getCommentaireById(idCommentaire);
        return commentaire;
    }
    @GetMapping("/getallCommentaire")
    public List<Commentaire> getAllCommentaires() {
        return commentaireService.getAllCommentaires();
    }
    @PutMapping("/updateCommentaire")
    public Commentaire updateCommentaire(@RequestBody Commentaire commentaire) {
        return  commentaireService.updateCommentaire(commentaire);
    }
    @DeleteMapping("/deletecmt/{idCommentaire}")
    public boolean deleteCommentaire(@PathVariable Long idCommentaire) {
        return commentaireService.deleteCommentaire(idCommentaire);

    }
    @GetMapping("/getcmtparpost/{idPost}")
    public List<Commentaire> getCommentsByPostId(@PathVariable Long idPost) {
        return commentaireService.getCommentsByPostId(idPost);
    }

    @PostMapping("/addCommentToPost/{postId}")
    public Commentaire addCommentToPost(@RequestBody Commentaire commentaire, @PathVariable Long postId) {
        return commentaireService.createCommentaireWithPost(commentaire, postId);
    }

    @PostMapping("/addCommentToPostAndAssignToUser/{postId}/users/{userId}/comments")
    public ResponseEntity<?> addCommentToUserPost(
            @RequestBody Commentaire commentaire,
            @PathVariable Long postId,
            @PathVariable Long userId) {

        try {
            Commentaire savedCommentaire = commentaireService.addCommentToPostAndAssignToUser(commentaire, postId, userId);
            return ResponseEntity.ok(savedCommentaire);
        } catch (RuntimeException e) {
            // Create a map or a custom object to hold the error details
            Map<String, Object> errorDetails = new HashMap<>();
            errorDetails.put("error", e.getMessage());
            errorDetails.put("status", HttpStatus.BAD_REQUEST);
            errorDetails.put("timestamp", LocalDateTime.now());
            // Optionally include the invalid commentaire data
            errorDetails.put("commentaire", commentaire);

            return ResponseEntity.badRequest().body(errorDetails);
        }
    }

}
