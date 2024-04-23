import { Journal } from '../JournalModule/Journal.module';

export enum Statut{
  EnCours = "En Cours" ,
  Validé  =" Validé",
  NonValidé ="Non Validé"

}

export class TacheJournal {
  idtache: number;
  descriptiontache: string;
  datetache: Date;
  status : Statut
  valid: boolean;
  journal?: Journal;
}
