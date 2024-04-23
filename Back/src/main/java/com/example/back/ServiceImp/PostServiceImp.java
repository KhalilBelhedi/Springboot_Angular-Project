package com.example.back.ServiceImp;

import com.example.back.Entities.Commentaire;
import com.example.back.Entities.Post;
import com.example.back.Entities.User;
import com.example.back.Repositories.PostRepository;
import com.example.back.Repositories.UserRepository;
import com.example.back.Services.PostService;
import jakarta.transaction.Transactional;
import com.example.back.Repositories.PostRepository;
import com.example.back.Services.PostService;
import lombok.RequiredArgsConstructor;

import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PostServiceImp implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;





    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
       }


    @Override
    public Post getPostById(Long idPost) {
        return postRepository.findById(idPost).orElse(null);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post updatePost(Post post) {
        Post existingPost = postRepository.findById(post.getIdPost())
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Post not found with id " + post.getIdPost()));

        existingPost.setContenu_Post(post.getContenu_Post());
        existingPost.setSujet_Post(post.getSujet_Post());
        existingPost.setAnonymous(post.isAnonymous());
        existingPost.setDate_Post(post.getDate_Post());
        existingPost.setProfileImage(post.getProfileImage());

        // Update the post field for each commentaire
        if (post.getCommentaires() != null) {
            for (Commentaire commentaire : post.getCommentaires()) {
                commentaire.setPost(existingPost);
            }
        }

        return postRepository.save(existingPost);
    }


    @Override
    public Boolean deletePost(Long idPost) {
        postRepository.deleteById(idPost);
        return true;
    }
    public Post likePost(Long idPost) {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Post not found with id " + idPost));

        if (post.isLikedByCurrentUser()) {
            post.setLikes(post.getLikes() - 1);
            post.setLikedByCurrentUser(false);
        } else {
            post.setLikes(post.getLikes() + 1);
            post.setLikedByCurrentUser(true);

            // If the post was disliked by the current user, remove the dislike
            if (post.isDislikedByCurrentUser()) {
                post.setDislikes(post.getDislikes() - 1);
                post.setDislikedByCurrentUser(false);
            }
        }

        return postRepository.save(post);
    }


    public Post dislikePost(Long idPost) {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Post not found with id " + idPost));

        if (post.isDislikedByCurrentUser()) {
            post.setDislikes(post.getDislikes() - 1);
            post.setDislikedByCurrentUser(false);
        } else {
            post.setDislikes(post.getDislikes() + 1);
            post.setDislikedByCurrentUser(true);

            // If the post was liked by the current user, remove the like
            if (post.isLikedByCurrentUser()) {
                post.setLikes(post.getLikes() - 1);
                post.setLikedByCurrentUser(false);
            }
        }

        return postRepository.save(post);
    }
    public Post unlikePost(Long idPost) {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Post not found with id " + idPost));

        if (post.isLikedByCurrentUser()) {
            post.setLikes(post.getLikes() - 1);
            post.setLikedByCurrentUser(false);
            return postRepository.save(post);
        }

        return post;
    }

    public Post undislikePost(Long idPost) {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Post not found with id " + idPost));

        if (post.isDislikedByCurrentUser()) {
            post.setDislikes(post.getDislikes() - 1);
            post.setDislikedByCurrentUser(false);
            return postRepository.save(post);
        }

        return post;
    }

    @Override
    @Transactional
    public Post createPostAndAssignToUser(Post post, Long userId) {
        // Retrieve the user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with ID " + userId + " not found"));

        // Save the post to generate its ID
        Post savedPost = postRepository.save(post);

        // Add a relationship entry in the join table
        postRepository.assignPostToUser(user.getId_User(), savedPost.getIdPost());

        // Return the saved post
        return savedPost;
    }

    @Override
    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findPostsByUserId(userId);
    }


}







