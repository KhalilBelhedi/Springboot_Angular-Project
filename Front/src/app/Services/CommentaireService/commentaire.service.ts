import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Commentaire} from "../../Modules/CommentaireModule/Commentaire.Module";

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiURL = 'http://localhost:9090/api/services/commentaire'; // Adjust the port number if needed

  constructor(private http: HttpClient) { }

  getCommentaireById(idCommentaire: number): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.apiURL}/getcmtparid/${idCommentaire}`);
  }

  getAllCommentaires(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiURL}/getallCommentaire`);
  }

  updateCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiURL}/updateCommentaire`, commentaire);
  }

  deleteCommentaire(idCommentaire: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/deletecmt/${idCommentaire}`);
  }

  getCommentsByPostId(idPost: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiURL}/getcmtparpost/${idPost}`);
  }

  addCommentToPost(commentaire: Commentaire, idPost: number): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.apiURL}/addCommentToPost/${idPost}`, commentaire)
      .pipe(
        catchError(error => {
          // Handle the error here
          console.error('Error creating comment', error);
          // Throw an observable with a user-facing error message
          return throwError(error);
        })
      );
  }


}
