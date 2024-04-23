import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grille} from "../../Modules/GrilleModule/Grille.module";

@Injectable({
  providedIn: 'root'
})
export class GrilleService {

  private apiUrl = 'http://localhost:9090/api/services/grille';
  constructor(private http: HttpClient) { }

  findAllGrilles(): Observable<Grille[]> {
    return this.http.get<Grille[]>(`${this.apiUrl}/GetAllGrille`);
  }

  addGrille(grille: Grille): Observable<Grille> {
    return this.http.post<Grille>(this.apiUrl, grille);
  }

  updateGrille(idGrille: number, updtgrille: Grille): Observable<Grille> {
    return this.http.put<Grille>(`${this.apiUrl}/updateGrille/${idGrille}`, updtgrille);
  }

  deleteGrille(idGrille: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeGrille/${idGrille}`);
  }


}
