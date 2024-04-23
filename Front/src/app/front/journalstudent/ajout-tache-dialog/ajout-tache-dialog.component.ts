import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {TacheJournalService} from "../../../Services/TacheJournalService/tachejournal.service";
import {TacheJournal} from "../../../Modules/TacheJournalModule/TacheJournal.module";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ajout-tache-dialog',
  templateUrl: './ajout-tache-dialog.component.html',
  styleUrls: ['./ajout-tache-dialog.component.css']
})
export class AjoutTacheDialogComponent implements OnInit {

/* nouvelleTache: TacheJournal;

  constructor(
    private tacheJournalService: TacheJournalService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AjoutTacheDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nouvelleTache: TacheJournal }
  ) {
    this.nouvelleTache = { ...this.data.nouvelleTache };
  }

  ngOnInit(): void {
    this.ajouterTache();
  }

  ajouterTache() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // The '+' symbol converts the string to a number
      this.tacheJournalService.addTache_JournalAndAssignToJournal(this.nouvelleTache, id).subscribe(() => {
        console.log('Tache ajoutée avec succès', this.nouvelleTache);
        window.location.reload();
      });
    });
  } */

  nouvelleTache: TacheJournal = new TacheJournal();

  constructor(
    private tacheJournalService: TacheJournalService,
    private dialogRef: MatDialogRef<AjoutTacheDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { journalId: number }
  ) {}

  ngOnInit(): void {}

  ajouterTache( )  {
     this.tacheJournalService.addTache_JournalAndAssignToJournal(this.nouvelleTache, this.data.journalId).subscribe(() => {
      console.log('Tache ajoutée avec succès', this.nouvelleTache);
      this.dialogRef.close(true); // Close the dialog and indicate success
    });
  }


}
