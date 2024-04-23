package com.example.back.Controllers;

import com.example.back.Entities.Convention;
import com.example.back.Entities.Stage;
import com.example.back.ServiceImp.StageServiceImp;
import com.example.back.Services.StageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/services/stage")
@CrossOrigin(origins = "http://localhost:4200")
public class StageController  {
    private final StageService stageService;
    @GetMapping("/getStages")
    public Collection<Stage> getStages(){
        return stageService.retrieveAllStages();
    }

    @PostMapping("/addStage")
    public Stage addStage(@RequestBody Stage stage){
        return stageService.addStage(stage);
    }


    @GetMapping("/getStage/{id}")
    public Stage getStage(@PathVariable Long id){
        return stageService.retrieveStage(id);
    }

    @PutMapping("/updateStage")
    public Stage updateStage(@RequestBody Stage stage){
        return stageService.updateStage(stage);
    }

    @DeleteMapping("/idStage")
    public void deleteStage(Long idStage){
        stageService.deleteStage(idStage);
    }

    @PostMapping("/createForValidConventions")
    public ResponseEntity<String> createStagesForValidConventions() {
        stageService.createStagesForValidConventions();
        return ResponseEntity.ok("Stages created for all valid conventions");
    }

    @GetMapping("/getStageByUser/{userId}")
    public ResponseEntity<List<Stage>> getStagesByUserId(@PathVariable Long userId) {
        List<Stage> stages = stageService.getStagesByUserId(userId);
        return ResponseEntity.ok(stages);
    }
    @PostMapping("/uploadReport/{stageId}")
    public ResponseEntity<?> uploadReport(@PathVariable Long stageId, @RequestParam("file") MultipartFile reportFile) {
        stageService.saveReport(stageId, reportFile);
        return ResponseEntity.ok("File uploaded successfully");
    }
}


