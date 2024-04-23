package com.example.back.Controllers;

import com.example.back.Entities.Commentaire;
import com.example.back.Entities.Post;
import com.example.back.ServiceImp.CommentaireServiceImp;
import com.example.back.Services.CommentaireService;
import com.example.back.Services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/services/post")
@CrossOrigin(origins = "http://localhost:4200")

public class PostController {
    private final PostService postService;
    private final CommentaireService commentaireService;

    @PostMapping("/addpost")
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @GetMapping("/getpostparid/{id}")
    public Post getPostById(@PathVariable(value = "id") Long idPost) {
        Post post = postService.getPostById(idPost);
        return post;
    }


    @GetMapping("/getallpost/all")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }


    @PutMapping("/updatepost/updateP")
    public Post updatePost(@RequestBody Post post) {
        return  postService.updatePost(post);
    }

    @DeleteMapping("/deletepost/{idPost}")
    public boolean deletePost(@PathVariable Long idPost) {
        Post post = postService.getPostById(idPost);
        postService.deletePost(idPost);
        return true;
    }

    @PostMapping("/likepost/{idPost}")
    public Post likePost(@PathVariable Long idPost) {
        return postService.likePost(idPost);
    }

    @PostMapping("/dislikepost/{idPost}")
    public Post dislikePost(@PathVariable Long idPost) {
        return postService.dislikePost(idPost);
    }

    @PutMapping("/unlikepost/{idPost}")
    public Post unlikePost(@PathVariable Long idPost) {
        return postService.unlikePost(idPost);
    }

    @PutMapping("/undislikepost/{idPost}")
    public Post undislikePost(@PathVariable Long idPost) {
        return postService.undislikePost(idPost);
    }

    @PostMapping("/createPostForUser/{userId}")
    public ResponseEntity<?> createPostForUser(@RequestBody Post post, @PathVariable Long userId) {
        try {
            Post createdPost = postService.createPostAndAssignToUser(post, userId);
            return ResponseEntity.ok(createdPost);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Add an exception handler for MethodArgumentNotValidException
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
    @GetMapping("/getpostbyuserid/{userId}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable Long userId) {
        try {
            List<Post> userPosts = postService.getPostsByUser(userId);
            if (userPosts.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(userPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }}
}


