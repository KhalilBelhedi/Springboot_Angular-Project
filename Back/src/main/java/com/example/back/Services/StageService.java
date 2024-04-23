package com.example.back.Services;

import com.example.back.Entities.Stage;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.List;

public interface StageService {
    Stage updateStage(Stage stage);
    Stage retrieveStage(Long id);
    Stage addStage(Stage stage);
    Collection<Stage> retrieveAllStages();
    void deleteStage(Long idStage);
    void createStagesForValidConventions();
    List<Stage> getStagesByUserId(Long userId);
    void saveReport(Long stageId, MultipartFile reportFile);


}
