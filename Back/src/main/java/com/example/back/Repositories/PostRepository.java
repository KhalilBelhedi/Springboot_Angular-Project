package com.example.back.Repositories;

import com.example.back.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

        @Modifying
        @Query(value = "INSERT INTO user_post_set (user_id_user, post_set_id_post) VALUES (:userId, :postId)", nativeQuery = true)
        void assignPostToUser(@Param("userId") Long userId, @Param("postId") Long postId);


        @Query(value = "SELECT p.* FROM Post p INNER JOIN user_post_set ups ON p.id_post = ups.post_set_id_post WHERE ups.user_id_user = :userId", nativeQuery = true)
        List<Post> findPostsByUserId(@Param("userId") Long userId);


        @Query(value = "SELECT COUNT(*) > 0 FROM user_post_set WHERE user_id_user = :userId AND post_set_id_post = :postId", nativeQuery = true)
        boolean isUserAssociatedWithPost(@Param("userId") Long userId, @Param("postId") Long postId);

}