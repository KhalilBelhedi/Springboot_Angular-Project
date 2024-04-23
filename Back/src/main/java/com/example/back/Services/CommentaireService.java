package com.example.back.Services;

import com.example.back.Entities.Commentaire;

import java.util.List;

public interface CommentaireService {
    Commentaire createCommentaire(Commentaire commentaire);
    Commentaire getCommentaireById(Long idCommentaire);
    List<Commentaire> getAllCommentaires();
    Commentaire updateCommentaire( Commentaire commentaire);
    Boolean deleteCommentaire(Long idCommentaire);
    List<Commentaire> getCommentsByPostId(Long idPost);
    Commentaire createCommentaireWithPost(Commentaire commentaire, Long postId);
    Commentaire addCommentToPostAndAssignToUser(Commentaire commentaire, Long postId, Long userId);


}
