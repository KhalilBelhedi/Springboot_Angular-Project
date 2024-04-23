package com.example.back.Services;

import com.example.back.Entities.Report;
import org.springframework.stereotype.Service;

@Service
public interface ReportService {
    Report reportPost(Long postId, String reason);

}
