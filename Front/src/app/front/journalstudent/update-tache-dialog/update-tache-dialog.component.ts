/*import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TacheJournalService} from "../../../Services/TacheJournalService/tachejournal.service";

@Component({
  selector: 'app-update-tache-dialog',
  templateUrl: './update-tache-dialog.component.html',
  styleUrl: './update-tache-dialog.component.css'
})
export class UpdateTacheDialogComponent implements OnInit {
  editedTache: any = {};
  idTache: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tacheJournalService: TacheJournalService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateTacheDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idTache: number }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.idTache) {
      this.idTache = this.data.idTache;
      this.tacheJournalService.findTacheById(this.idTache).subscribe(
        (tache) => {
          this.editedTache = tache;
        },
        (error) => {
          console.error('Error fetching Tache data:', error);
        }
      );
    }
  }

/*  saveChanges() {
    this.tacheJournalService.updateTache_Journal(this.editedTache).subscribe(
      () => {
        const config = new MatSnackBarConfig();
        config.duration = 2000;

        this.snackBar.open('Tache a été modifiée avec succès', 'Fermer', config);
        window.location.reload();

      },
      (error) => {
        console.error('Error updating Tache data:', error);
      }
    );
  }*/
 /* saveChanges() {
    this.tacheJournalService.updateTache_Journal(this.editedTache).subscribe(
      (updatedTache) => {
        this.snackBar.open('Tache mise à jour avec succès', 'Fermer', { duration: 2000 });
        this.dialogRef.close(updatedTache);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
      }
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
*/
// update-tache-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {TacheJournalService} from "../../../Services/TacheJournalService/tachejournal.service";

@Component({
  selector: 'app-update-tache-dialog',
  // templateUrl: './update-tache-dialog.component.html',
  templateUrl: './update-tache-dialog.component.html',
  styleUrls: ['./update-tache-dialog.component.css']
})
export class UpdateTacheDialogComponent {
  updateTacheForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTacheDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Contient l'objet tache à mettre à jour
    private tacheJournalService: TacheJournalService
  ) {
    this.updateTacheForm = this.fb.group({
      descriptiontache: [data.tache.descriptiontache],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  onUpdate(): void {
    if (this.updateTacheForm.valid) {
      const updatedTache = { ...this.data.tache, ...this.updateTacheForm.value };
      this.tacheJournalService.updateTache_Journal(updatedTache.idtache, updatedTache).subscribe(() => {
        this.dialogRef.close(true); // Ferme le dialogue avec un indicateur de succès
      });
    }
  }
}
