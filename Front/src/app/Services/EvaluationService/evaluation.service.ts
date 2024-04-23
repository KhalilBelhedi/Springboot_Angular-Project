import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Evaluation}   from "../../Modules/EvaluationModule/Evaluation.module";
import {Observable} from "rxjs";
import {TacheJournal} from "../../Modules/TacheJournalModule/TacheJournal.module";
import {Journal} from "../../Modules/JournalModule/Journal.module";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private apiUrl = 'http://localhost:9090/api/services/evaluation';

  constructor(private http: HttpClient)  { }



  findAllEvaluationsByIdJournal(id: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`http://localhost:9090/api/services/evaluation/GetEvaluationsbyJournal/${id}`);
  }

  updateEvaluation(idEvaluation: number, evaluation: Evaluation): Observable<Journal> {
    const url = `${this.apiUrl}/updatEvaluation/${idEvaluation}`;
    return this.http.put<Journal>(url, evaluation);
  }
}
