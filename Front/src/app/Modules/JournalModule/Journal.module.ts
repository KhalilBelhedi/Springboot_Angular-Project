import { TacheJournal } from '../TacheJournalModule/TacheJournal.module';
// @ts-ignore
import { Evaluation } from  '../EvaluationModule/Evaluation.module';
export class Journal {
  idJournal: number;
  remarque: string;
  totalNoteEvaluation: number;
  journalIsValid: boolean;
 // stage?: Stage;
  tache_journal?: TacheJournal[];
  evaluations?: Evaluation[];
}
