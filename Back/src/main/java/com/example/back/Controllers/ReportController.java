package com.example.back.Controllers;

import com.example.back.Entities.Report;
import com.example.back.Services.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/services/report")
@CrossOrigin(origins = "http://localhost:4200")

public class ReportController {
    private final ReportService reportService;
    @PostMapping("/reportPost/{postId}")
    public ResponseEntity<Report> reportPost(@PathVariable Long postId, @RequestBody String reason) {
        Report report = reportService.reportPost(postId, reason);
        return new ResponseEntity<>(report, HttpStatus.CREATED);
    }

}
