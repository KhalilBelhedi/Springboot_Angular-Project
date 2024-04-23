package com.example.back.Repositories;

import com.example.back.Entities.Journal;
import com.example.back.Entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByLogin(String username);




    @Query("select u from User u inner join u.conventionSet conventionSet where conventionSet.stage.journal.idJournal = ?1")
    User findByConventionSet_Stage_Journal(Long idJournal);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM user_post_set WHERE post_set_id_post = :postId", nativeQuery = true)
    void deleteByPostId(@Param("postId") Long postId);




}