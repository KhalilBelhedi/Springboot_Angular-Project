package com.example.back.Repositories;

import com.example.back.Entities.Commentaire;
import com.example.back.Entities.Post;
import com.example.back.Entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long>{
    long countByPost(Post post);


    void deleteByPost(Post post);

}
