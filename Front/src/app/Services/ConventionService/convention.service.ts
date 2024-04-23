// src/app/services/convention.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Convention} from "../../Modules/ConventionModule/Convention.module";
import {Stage} from "../../Modules/StageModule/Stage.module";

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private apiUrl = 'http://localhost:9090/api/services/convention';
  private apiUrl1 = 'http://localhost:9090/api/services/stage';


  constructor(private http: HttpClient) { }

  getConventions(): Observable<Convention[]> {
    return this.http.get<Convention[]>(this.apiUrl+'/getConventions');
  }
  getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(this.apiUrl1+'/getStages');
  }
  getArchivedConventions(): Observable<Convention[]> {
    return this.http.get<Convention[]>(this.apiUrl+'/getArchivedConventions')
  }
  validateConvention(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/validateConvention/${id}`, null);
  }

  addConvention(convention: Convention) {
    return this.http.post(`${this.apiUrl}/addConvention`, convention);
  }

  archiveConvention(id: number) {
    return this.http.put( `${this.apiUrl}/archiveConvention/${id}`,null);
  }
  unarchiveConvention(id: number) {
    return this.http.put( `${this.apiUrl}/unarchiveConvention/${id}`,null);
  }
  createStagesForValidConventions(): Observable<any> {
    return this.http.post(`${this.apiUrl1}/createForValidConventions`, null);
  }

  getConventionsByUser(userId: number): Observable<Convention[]> {
    const url = `${this.apiUrl}/getConventionsbyuser/${userId}`;
    return this.http.get<Convention[]>(url);
  }
  getStageByUser(userId: number): Observable<Stage[]> {
    const url = `${this.apiUrl1}/getStageByUser/${userId}`;
    return this.http.get<Stage[]>(url);
  }
  addConventionAndAssignToUser(convention: Convention, userId: number): Observable<Convention> {
    const url = `${this.apiUrl}/addConventionAndAffectToUser/${userId}`;
    return this.http.post<Convention>(url, convention);
  }
  uploadStageReport(stageId: number, formData: FormData): Observable<any> {
    // Adjust the URL based on your API endpoint
    return this.http.post<any>(`http://localhost:9090/api/services/stage/uploadReport/3`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  downloadPdf(conventionId: number): Observable<Blob> {

    return this.http.get(`http://localhost:9090/api/services/convention/${conventionId}/pdf`, { responseType: 'blob' });
  }
}


