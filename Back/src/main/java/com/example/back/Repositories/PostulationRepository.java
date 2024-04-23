package com.example.back.Repositories;
import com.example.back.Entities.Enums.UserRole;
import com.example.back.Entities.Postulation;
import com.example.back.Entities.Sujet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostulationRepository extends JpaRepository<Postulation, Long> {


    List<Postulation> findByStatus(int status);

    List<Postulation> getPostulationsByStatus(int status);

    @Query("SELECT p FROM Postulation p WHERE p.sujet.user.id_User = :userId AND p.status = :status")
    List<Postulation> findByUserIdAndStatus(@Param("status") int status , @Param("userId") Long userId );


    @Query("SELECT p FROM Postulation p WHERE p.sujet.idsujet = :sujetId AND p.statusentr = :status")
    List<Postulation> findBySujetIdAndStatus(@Param("sujetId") Long sujetId, @Param("status") int status);

    @Query("SELECT DISTINCT p.sujet.user.role FROM Postulation p WHERE p.sujet.user.id_User = :idadmin")
    UserRole findUserRoleByAdminId(@Param("idadmin") Long idadmin);



}
