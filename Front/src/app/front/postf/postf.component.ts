import { ChangeDetectorRef, Component } from '@angular/core';
import { Post } from '../../Modules/PostModule/Post.Module';
import { PostService } from '../../Services/PostService/post.service';
import { CommentaireService } from '../../Services/CommentaireService/commentaire.service';
import { Commentaire } from "../../Modules/CommentaireModule/Commentaire.Module";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-postf',
  templateUrl: './postf.component.html',
  styleUrls: ['./postf.component.css']
})
export class PostfComponent {
  posts: Post[] = [];
  editingPost: Post | null = null;
  newCommentContent: string = '';
  showAddCommentForm: boolean = false;
  showReportFormForPostId: number | null = null;

  newPost: Post = {
    idPost: 0,
    contenu_Post: '',
    sujet_Post: '',
    isAnonymous: false,
    date_Post: new Date().toISOString(),
    profileImage: 'assets/user.png', // Default image path
    likes: 0, // Initialize likes to 0
    dislikes: 0,
    isLikedByCurrentUser: false,
    isDislikedByCurrentUser: false

  };

  constructor(
    private postService: PostService,
    private commentaireService: CommentaireService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  // deletePost(idPost: number): void {
  //   this.postService.deletePost(idPost).subscribe(() => {
  //     this.posts = this.posts.filter(post => post.idPost !== idPost);
  //   });
  // }
  //
  // editPost(post: Post): void {
  //   this.editingPost = { ...post }; // Create a copy of the post to edit
  // }

  submitEdit(): void {
    if (this.editingPost) {
      this.postService.updatePost(this.editingPost).subscribe(updatedPost => {
        const index = this.posts.findIndex(post => post.idPost === updatedPost.idPost);
        if (index !== -1) {
          this.posts[index] = updatedPost; // Update the post in the array
        }
        this.editingPost = null; // Clear the editing post
      });
    }
  }

  // cancelEdit(): void {
  //   this.editingPost = null; // Cancel editing and clear the form
  // }

  /*addPost(): void {
     this.postService.createPost(this.newPost).subscribe(post => {
  this.posts.push(post); // Add the new post to the posts array
      // Reset the newPost object for the next entry
      this.newPost = {
         idPost: 0,
         contenu_Post: '',
        sujet_Post: '',
        isAnonymous: false,
         date_Post: new Date().toISOString(),
        profileImage: '', // Default image path
         likes: 0, // Initialize likes to 0
         dislikes: 0,
         isLikedByCurrentUser: false,
        isDislikedByCurrentUser: false


      };
     });
   }*/
  // addPost(): void {
  //   this.postService.createPost(this.newPost).subscribe(post => {
  //     this.posts.push(post); // Add the new post to the posts array
  //     // Reset the newPost object for the next entry
  //     this.newPost = {
  //       idPost: 0,
  //       contenu_Post: '',
  //       sujet_Post: '',
  //       isAnonymous: false,
  //       date_Post: new Date().toISOString(),
  //       profileImage: 'assets/user.png', // Default image path
  //       likes: 0, // Initialize likes to 0
  //       dislikes: 0,
  //       isLikedByCurrentUser: false,
  //       isDislikedByCurrentUser: false
  //
  //
  //     };
  //   });
  // }

  viewComments(post: Post): void {
    // If comments have not been fetched yet, fetch them
    if (!post.commentaireSet) {
      this.commentaireService.getCommentsByPostId(post.idPost).subscribe(comments => {
        post.commentaireSet = comments;
        post.showComments = true; // Add this property to your Post model if not present
      });
    } else {
      // If comments are already fetched, just toggle the visibility
      post.showComments = !post.showComments;
    }
  }

  addComment(post: Post, form: NgForm): void {
    if (this.newCommentContent.trim()) {
      const newComment: Commentaire = {
        content: this.newCommentContent,
        date_commentaire: new Date().toISOString(),
      };

      this.commentaireService.addCommentToPost(newComment, post.idPost).subscribe({
        next: (addedComment) => {
          // Success logic
          post.commentaireSet = [...(post.commentaireSet || []), addedComment];
          this.newCommentContent = '';
          form.resetForm();
          this.showAddCommentForm = false;
        },
        error: (errorResponse) => {
          // Error handling logic
          console.error('Error occurred while adding comment: ', errorResponse);
          // Check if the error response is a string or an object
          const errorMessage = typeof errorResponse.error === 'string' ? errorResponse.error : errorResponse.error?.message;
          // Display the error message in an alert
          alert(errorMessage || 'C   omment is inappropriate.');
        }
      });
    } else {
      // Handle empty comment content case
      alert('Comment content cannot be empty.');
    }
  }

  toggleLike(post: Post): void {
    if (post.isLikedByCurrentUser) {
      this.postService.unlikePost(post.idPost).subscribe(updatedPost => {
        post.likes = updatedPost.likes;
        post.isLikedByCurrentUser = false;
      });
    } else {
      this.postService.likePost(post.idPost).subscribe(updatedPost => {
        post.likes = updatedPost.likes;
        post.isLikedByCurrentUser = true;
        post.isDislikedByCurrentUser = false; // Remove dislike if post is liked
      });
    }
  }

  toggleDislike(post: Post): void {
    if (post.isDislikedByCurrentUser) {
      this.postService.undislikePost(post.idPost).subscribe(updatedPost => {
        post.dislikes = updatedPost.dislikes;
        post.isDislikedByCurrentUser = false;
      });
    } else {
      this.postService.dislikePost(post.idPost).subscribe(updatedPost => {
        post.dislikes = updatedPost.dislikes;
        post.isDislikedByCurrentUser = true;
        post.isLikedByCurrentUser = false; // Remove like if post is disliked
      });
    }
  }
  reportPost(postId: number| undefined, reason: string): void {
    this.postService.reportPost(postId, reason).subscribe(() => {
      // Handle success message or action (e.g., display confirmation)
      console.log("Post reported successfully!");
    }, error => {
      // Handle error message (e.g., display error notification)
      console.error("Error reporting post:", error);
    });
  }

  reportComment(commentId: number | undefined, reason: string): void {
    this.postService.reportComment(commentId, reason).subscribe(() => {
      // Handle success message or action
      console.log("Comment reported successfully!");
    }, error => {
      // Handle error message
      console.error("Error reporting comment:", error);
    });
  }
  showReportPostForm: boolean = false;
  reportPostReason: string = '';

  showReportCommentForm: boolean = false;
  reportCommentReason: string = '';

  openReportPostForm(postId: number) {
    this.showReportFormForPostId = postId;
  }


  submitReportPost(postId: number): void {
    this.postService.reportPost(postId, this.reportPostReason).subscribe(() => {
      // Handle success message or action (e.g., display confirmation)
      console.log("Post reported successfully!");
      this.showReportPostForm = false; // Close the form
    }, error => {
      // Handle error message (e.g., display error notification)
      console.error("Error reporting post:", error);
    });
  }

  cancelReportPost(): void {
    this.showReportFormForPostId = null;
    this.reportPostReason = ''; // Clear reason on canceling
  }
  openReportCommentForm(comment: Commentaire): void {
    this.showReportCommentForm = true;
    this.reportCommentReason = ''; // Clear reason on opening the form
  }

  submitReportComment(commentId: number): void {
    this.postService.reportComment(commentId, this.reportCommentReason).subscribe(() => {
      // Handle success message or action
      console.log("Comment reported successfully!");
      this.showReportCommentForm = false; // Close the form
    }, error => {
      // Handle error message
      console.error("Error reporting comment:", error);
    });
  }

  cancelReportComment(): void {
    this.showReportCommentForm = false;
    this.reportCommentReason = ''; // Clear reason on canceling
  }
}
