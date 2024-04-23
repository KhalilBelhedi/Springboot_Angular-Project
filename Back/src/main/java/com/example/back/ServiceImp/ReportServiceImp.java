package com.example.back.ServiceImp;

import com.example.back.Entities.Commentaire;
import com.example.back.Entities.Post;
import com.example.back.Entities.Report;
import com.example.back.Repositories.CommentaireRepository;
import com.example.back.Repositories.PostRepository;
import com.example.back.Repositories.ReportRepository;
import com.example.back.Repositories.UserRepository;
import com.example.back.Services.ReportService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReportServiceImp implements ReportService {
    private final PostRepository postRepository;
    private final CommentaireRepository commentaireRepository;
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Report reportPost(Long postId, String reason) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));
        Report report = new Report();
        report.setPost(post);
        report.setReason(reason);
        reportRepository.save(report);

        // Check if the number of reports for the post exceeds the threshold
        long reportCount = reportRepository.countByPost(post);
        if (reportCount > 10) {
            userRepository.deleteByPostId(postId);

            commentaireRepository.deleteAll(post.getCommentaires());
            reportRepository.deleteByPost(post);
            postRepository.deleteById(postId);
        }

        return report;
    }


}