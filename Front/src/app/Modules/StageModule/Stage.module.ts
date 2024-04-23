import { Convention } from '../ConventionModule/Convention.module';

export interface Stage {
  idStage: number;
  sujet_Stage: string;
  note_stage: number;
  archived: boolean;
  nom_fichier_rapport: string;
  convention: Convention;
}
