import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journal } from '../../Modules/JournalModule/Journal.module'; // Assume you have a Journal model defined with the necessary attributes

@Injectable({
  providedIn: 'root'
})


export class JournalService {

  private apiUrl = 'http://localhost:9090/api/services/journal'; // Update this with the actual URL to your API

  constructor(private http: HttpClient) { }

  addJournal(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(this.apiUrl, journal);
  }

  addJournalAndAssignToStage(journal: Journal, idStage: number): Observable<Journal> {
    return this.http.post<Journal>(`${this.apiUrl}/${idStage}`, journal);
  }

  updateJournal(journal: Journal): Observable<Journal> {
    return this.http.put<Journal>(this.apiUrl, journal);
  }

  findById(idJournal: number): Observable<Journal> {
    return this.http.get<Journal>(`${this.apiUrl}/${idJournal}`);
  }

  GetJournalByEncadrant(mailEncadrant: string){

  return  this.http.get<Journal[]>(`${this.apiUrl}/getjournalbyencadrant/${mailEncadrant}`);
  }

  GetJournalByIdStage(idStage: number)
  {
    return  this.http.get<Journal>(`${this.apiUrl}/getjournalbyIdStage/${idStage}`);
  }



}
