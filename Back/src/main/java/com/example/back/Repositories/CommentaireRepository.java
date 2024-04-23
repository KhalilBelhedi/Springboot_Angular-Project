package com.example.back.Repositories;

import com.example.back.Entities.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
    @Query(value = "SELECT * FROM commentaire WHERE post_id = ?1", nativeQuery = true)
    List<Commentaire> findCommentsByPostId(Long idPost);

}