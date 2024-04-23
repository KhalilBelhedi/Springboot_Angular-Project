import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujet } from '../../models/sujet.model';


@Injectable({
  providedIn: 'root'
})


export class SujetService {
  private apiUrl = 'http://localhost:9090/api/services/sujet';

  constructor(private http: HttpClient) { }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getAllSujets(idadmin: number, sortField: string, searchTerm: string): Observable<Sujet[]> {
    // Ajouter l'ID de l'administrateur à l'URL de la requête
    const url = `${this.apiUrl}/affich/${idadmin}`;

    // Ajouter les champs de tri et de recherche comme paramètres de la requête
    const params = {
      sort: sortField,
      search: searchTerm
    };

    return this.http.get<Sujet[]>(url, { params });
  }


  getSujets(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${this.apiUrl}`);
  }
    searchSujets(searchTerm: string): Observable<Sujet[]> {
      return this.http.get<Sujet[]>(`${this.apiUrl}/search`, { params: { searchTerm } });
    }

  addSujet(sujet: Sujet , id: number): Observable<Sujet> {
    const url = `${this.apiUrl}/add/${id}`;
    return this.http.post<Sujet>(url, sujet);
  }

  updateSujet(sujet: Sujet): Observable<Sujet> {
    const url = `${this.apiUrl}/${sujet.idsujet}`;
    return this.http.put<Sujet>(url, sujet);
  }

  getSujetById(idsujet: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${this.apiUrl}/${idsujet}`);
  }

  supprimerSujet(idSujet: number): Observable<void> {
    const url = `${this.apiUrl}/${idSujet}`;
    return this.http.delete<void>(url);
  }

  filterByNbretudiantDescending(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${this.apiUrl}/filter/byNbretudiantDesc`);
  }

  filterByNbretudiantAscending(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${this.apiUrl}/filter/byNbreEtudiantAsc`);
  }
  filterByDureeAscending(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${this.apiUrl}/filter/byDureeAsc`);
  }

  filterByDureeDescending(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${this.apiUrl}/filter/byDureeDesc`);
  }

  getAllSujetsf(classe : string): Observable<Sujet[]> {
    // Ajouter l'ID de l'administrateur à l'URL de la requête
    const url = `${this.apiUrl}/classe/${classe}`;
    return this.http.get<Sujet[]>(url);
  }


}
