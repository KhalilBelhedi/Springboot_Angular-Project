
export enum Appreciation{

  EXCELLENT ="EXCELLENT",
  TRESBON="TRESBON",
  SATISFAISANT="SATISFAISANT",
  INSATISFAISANT="INSATISFAISANT"
}



export class Evaluation {

  idEvaluation: number;
  noteEvaluation: number;
  description: string
  appreciation : Appreciation
}
