package com.example.back.Services;

import com.example.back.Entities.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {
    Post createPost(Post post);
    Post getPostById(Long idPost);
    List<Post> getAllPosts();
    Post updatePost( Post post);
    Boolean deletePost(Long idPost);
    Post likePost(Long idPost);
    Post dislikePost(Long idPost);
     Post unlikePost(Long idPost);
     Post undislikePost(Long idPost) ;
    Post createPostAndAssignToUser(Post post,Long userId);
    List<Post> getPostsByUser(Long userId);





}
