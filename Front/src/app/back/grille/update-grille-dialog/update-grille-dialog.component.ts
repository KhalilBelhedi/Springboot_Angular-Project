import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TacheJournalService} from "../../../Services/TacheJournalService/tachejournal.service";
import {GrilleService} from "../../../Services/GrilleService/grille.service";

@Component({
  selector: 'app-update-grille-dialog',
  templateUrl: './update-grille-dialog.component.html',
  styleUrl: './update-grille-dialog.component.css'
})
export class UpdateGrilleDialogComponent   {

  updateGrilleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateGrilleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Contient l'objet tache à mettre à jour
    private grilleService: GrilleService
  ) {
    this.updateGrilleForm = this.fb.group({
      descriptionGrille: [data.grille.descriptionGrille],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  onUpdategrille(): void {
    if (this.updateGrilleForm.valid) {
      const updatedGrille = { ...this.data.grille, ...this.updateGrilleForm.value };
      this.grilleService.updateGrille(updatedGrille.idGrille, updatedGrille).subscribe(() => {
        this.dialogRef.close(true); // Ferme le dialogue avec un indicateur de succès
      });
    }
  }


}
