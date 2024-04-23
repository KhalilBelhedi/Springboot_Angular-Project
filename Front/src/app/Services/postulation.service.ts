import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postulation } from  '../../models/postulation.model';
import { Sujet } from '../../models/sujet.model';
import { EmailRequest } from '../../models/EmailRequest.mosels';

@Injectable({
  providedIn: 'root'      // you ensure that Angular creates only one instance of the service and provides it globally.
})
export class PostulationService {

  private apiUrl = 'http://localhost:9090/api/services/postulation';

  constructor(private http: HttpClient) { }

  getSujetById(idsujet: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${this.apiUrl}/sujet/${idsujet }`);
  }

 addPostulation(postulation: Postulation, sujetId: number, Userid : number): Observable<Postulation> {
   return this.http.post<Postulation>(this.apiUrl+"/add/" + sujetId + "/" + Userid, postulation);
  }



  updatePostulation(postulation: Postulation, id: number): Observable<Postulation> {
    return this.http.put<Postulation>(`${this.apiUrl}/${id}`, postulation);
  }

  getAllPostulations(): Observable<Postulation[]> {
    return this.http.get<Postulation[]>(`${this.apiUrl}?status=0`);
  }

  getPostulationsAttente(idadmin: number): Observable<Postulation[]> {
    return this.http.get<Postulation[]>(`${this.apiUrl}/attente/${idadmin}`);
}


  getPostulationById(id: number): Observable<Postulation> {
    return this.http.get<Postulation>(`${this.apiUrl}/${id}`);
  }

  deletePostulation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }


  filterByAccepted(): Observable<Postulation[]> {
    return this.http.get<Postulation[]>(`${this.apiUrl}/byAccepted`);
  }

  filterByRefused(): Observable<Postulation[]> {
    return this.http.get<Postulation[]>(`${this.apiUrl}/byRefused`);
  }

  filterByAttente(): Observable<Postulation[]> {
    return this.http.get<Postulation[]>(`${this.apiUrl}/byAttente`);
  }



  getSujetTypeById(idsujet: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/typesujet/${idsujet}`);
  }

  confirmPostulation(postulation: Postulation, userRole: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/confirm-postulation/${postulation.idp}/${userRole}`, null);
  }

  rejectPostulation(postulation: Postulation , userRole: string ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reject-postulation/${postulation.idp}/${userRole}`, null);
  }

  filterByAttenteAndSujet(sujetId: number): Observable<Postulation[]> {
    return this.http.get<Postulation[]>(`${this.apiUrl}/byIdSujetAndAttente/${sujetId}`);
  }


  sendEmail(emailRequest: EmailRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-email`, emailRequest);
  }


}
