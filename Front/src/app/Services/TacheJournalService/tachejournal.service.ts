import {Injectable} from "@angular/core"; // Replace with your actual model
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// @ts-ignore
import { TacheJournal } from '../../Modules/TacheJournalModule/TacheJournal.module';


@Injectable({
  providedIn: 'root'
})
export class TacheJournalService {

  private apiUrl = 'http://localhost:9090/api/services/tache_journal'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  addTache_JournalAndAssignToJournal(tacheJournal: TacheJournal,id: number): Observable<TacheJournal> {
    return this.http.post<TacheJournal>(`http://localhost:9090/api/services/tache_journal/${id}`, tacheJournal);
  }

  findAllTachesByIdJournal(id: number): Observable<TacheJournal[]> {
    return this.http.get<TacheJournal[]>(`http://localhost:9090/api/services/tache_journal/GetTachebyJournal/${id}`);
  }

  findTacheById( id:number){
    return this.http.get<TacheJournal[]>(`http://localhost:9090/api/services/tache_journal/${id}`);
  }

  /*updateTache_Journal(tacheJournal:TacheJournal){
    return this.http.put<TacheJournal[]> (`${this.apiUrl}/updatetache/${tacheJournal.idtache}`, tacheJournal);
  }*/

  updateTache_Journal(idtache: number, tacheJournal: TacheJournal): Observable<TacheJournal> {
    return this.http.put<TacheJournal>(`${this.apiUrl}/updatetache/${idtache}`, tacheJournal);
  }


  deleteTacheJournal(idtache: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removetache/${idtache}`);
  }

  updateValidTache(idtache: number, tacheJournal: TacheJournal): Observable<TacheJournal> {
    return this.http.put<TacheJournal>(`${this.apiUrl}/updateIsValidtache/${idtache}`, tacheJournal);
  }

  updateNonValidtache (idtache: number, tacheJournal: TacheJournal): Observable<TacheJournal> {
    return this.http.put<TacheJournal>(`${this.apiUrl}/updateNonValidtache/${idtache}`, tacheJournal);
  }

  // Add other service methods here
}
