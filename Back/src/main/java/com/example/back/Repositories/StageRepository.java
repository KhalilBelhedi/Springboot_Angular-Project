package com.example.back.Repositories;

import com.example.back.Entities.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StageRepository extends JpaRepository<Stage, Long> {
    Optional<Stage> findByConvention_IdConvention(Long conventionId);
   // List<Stage> findByArchivedTrue(boolean archived);



    @Query(value = "SELECT s.* FROM stage s JOIN convention c ON s.convention_id_convention = c.id_convention JOIN user u ON c.user_id_user = u.id_user WHERE u.id_user = :userId", nativeQuery = true)
    List<Stage> findStageByUserId(@Param("userId") Long userId);





}