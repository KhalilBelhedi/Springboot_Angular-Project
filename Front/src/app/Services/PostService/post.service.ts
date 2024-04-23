import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../Modules/PostModule/Post.Module";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL='http://localhost:9090/api/services/post';
  private apiURL1 = 'http://localhost:9090/api/services/report'; // Adjusted API URL based on report controller

  constructor(private  http:HttpClient) { }


  createPost(post: Post, userId:number): Observable<Post> {
    return this.http.post<Post>(`${this.apiURL}/createPostForUser/${userId}`, post);
  }

  getPostById(idPost: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiURL}/getpostparid/${idPost}`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/getallpost/all`);
  }

  getAllPostsbyUserId(userId:number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/getpostbyuserid/${userId}`);
  }


  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiURL}/updatepost/updateP`, post);
  }

  deletePost(idPost: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/deletepost/${idPost}`);
  }
  likePost(idPost: number): Observable<Post> {
    return this.http.post<Post>(`${this.apiURL}/likepost/${idPost}`, {});
  }

  dislikePost(idPost: number): Observable<Post> {
    return this.http.post<Post>(`${this.apiURL}/dislikepost/${idPost}`, {});
  }
  unlikePost(idPost: number): Observable<Post> {
    return this.http.put<Post>(`${this.apiURL}/unlikepost/${idPost}`, {});
  }

  undislikePost(idPost: number): Observable<Post> {
    return this.http.put<Post>(`${this.apiURL}/undislikepost/${idPost}`, {});
  }

  reportPost(postId: number | undefined, reason: string): Observable<any> { // Replace "any" with appropriate response type
    return this.http.post(`${this.apiURL1}/reportPost/${postId}`, { reason });
  }

  reportComment(commentId: number | undefined, reason: string): Observable<any> { // Replace "any" with appropriate response type
    return this.http.post(`${this.apiURL1}/reportComment/${commentId}`, { reason });
  }

}
