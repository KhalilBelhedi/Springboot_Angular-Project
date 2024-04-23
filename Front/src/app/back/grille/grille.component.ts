import {Component, OnInit} from '@angular/core';
import {Grille} from "../../Modules/GrilleModule/Grille.module";
import { GrilleService } from '../../Services/GrilleService/grille.service';
import {ActivatedRoute} from "@angular/router";
import {AjoutTacheDialogComponent} from "../../front/journalstudent/ajout-tache-dialog/ajout-tache-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AjoutGrilleDialogComponent} from "./ajout-grille-dialog/ajout-grille-dialog.component";
import {UpdateTacheDialogComponent} from "../../front/journalstudent/update-tache-dialog/update-tache-dialog.component";
import {UpdateGrilleDialogComponent} from "./update-grille-dialog/update-grille-dialog.component"; // Ajustez le chemin si nécessaire


@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.css'
})
export class GrilleComponent implements OnInit {

  grilles: Grille[] = [];
  nouvellegrille: { idGrille: 0, descriptionGrille: ''}

  constructor(
    private dialog: MatDialog   ,   private route: ActivatedRoute,
      private grilleService: GrilleService
  ) { }
  ngOnInit(): void {
    this.getGrilles()
  }
  getGrilles(): void {
    this.grilleService.findAllGrilles().subscribe((data: Grille[]) => {
      this.grilles = data;
    });
    }

  openAjoutGrilleDialog(): void {
    const dialogRef = this.dialog.open(AjoutGrilleDialogComponent, {
      width: '500px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with success');
        // Refresh your data or perform other actions
      }
    });
  }

  openUpdateGrilleDialog(grille: Grille): void {
    const dialogRef = this.dialog.open(UpdateGrilleDialogComponent, {
      width: '250px',
      data: { grille }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // La tâche a été mise à jour, vous pouvez rafraîchir la liste des tâches si nécessaire
      }
    });
  }

  deleteGrille(idGrille: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette Grille ?')) {
      this.grilleService.deleteGrille(idGrille).subscribe(() => {
        // Mettez à jour la liste des tâches ou rafraîchissez les données
        this.grilles = this.grilles.filter(grille => grille.idGrille !== idGrille);
      });
    }
  }


}
