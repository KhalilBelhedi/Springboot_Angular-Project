import {Component, OnInit} from '@angular/core';
import {Grille} from "../../../Modules/GrilleModule/Grille.module";
import {FormBuilder, FormGroup , Validators } from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {GrilleService} from "../../../Services/GrilleService/grille.service";
import {TacheJournal} from "../../../Modules/TacheJournalModule/TacheJournal.module";

@Component({
  selector: 'app-ajout-grille-dialog',
  templateUrl: './ajout-grille-dialog.component.html',
  styleUrl: './ajout-grille-dialog.component.css'
})
export class AjoutGrilleDialogComponent implements OnInit {

  ajoutGrilleForm: FormGroup;
  nouvelleGrille: Grille = new Grille();


  constructor(
    public dialogRef: MatDialogRef<AjoutGrilleDialogComponent>,
    private grilleService: GrilleService,
    private fb: FormBuilder
  ) {
    this.ajoutGrilleForm = this.fb.group({
      descriptionGrille: ['', Validators.required],
      // Ajoutez d'autres champs si nécessaire
    });
  }
  ngOnInit(): void {}
  // onAjout(): void {
  //   if (this.ajoutGrilleForm.valid) {
  //     const nouvelleGrille: Grille = this.ajoutGrilleForm.value;
  //     this.grilleService.addGrille(nouvelleGrille).subscribe(() => {
  //       this.dialogRef.close(true); // Ferme le dialogue avec un indicateur de succès
  //     });
  //   }
  // }

  ajouterGrille() {
    this.grilleService.addGrille(this.nouvelleGrille,).subscribe(() => {
      console.log('Grille ajoutée avec succès', this.nouvelleGrille);
      this.dialogRef.close(true); // Close the dialog and indicate success
    });
  }



  protected readonly onsubmit = onsubmit;
}
