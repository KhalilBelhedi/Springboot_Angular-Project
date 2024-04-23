package com.example.back.Repositories;

import com.example.back.Entities.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {


}