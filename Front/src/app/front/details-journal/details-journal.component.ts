import {Component, OnInit} from '@angular/core';
import {Statut, TacheJournal} from "../../Modules/TacheJournalModule/TacheJournal.module";
import {Journal} from "../../Modules/JournalModule/Journal.module";
import {ActivatedRoute} from "@angular/router";
import {JournalService} from "../../Services/JournalService/journal.service";
import {TacheJournalService} from "../../Services/TacheJournalService/tachejournal.service";
import {MatDialog} from "@angular/material/dialog";
import {GrilleDetailComponent} from "./grille-detail/grille-detail.component";

@Component({
  selector: 'app-details-journal',
  templateUrl: './details-journal.component.html',
  styleUrl: './details-journal.component.css'
})
export class DetailsJournalComponent  implements OnInit{

  journal: Journal;
  taches: TacheJournal[] = [];
  nouvelleTache: { idtache: 0, descriptiontache: '', date_tache: Date, isValid: false };
  idJournal: number ;
  isGrilleDetailOpened : boolean = false;

  changeGrilleDetails (): boolean {
   return  this.isGrilleDetailOpened = !this.isGrilleDetailOpened;
  }
  constructor(
    private route: ActivatedRoute,
    private journalService: JournalService,
    private tacheJournalService: TacheJournalService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // The '+' symbol converts the string to a number
      if (id) {
        this.journalService.findById(id).subscribe({
          next: (journal) => {
            console.log(journal);
            this.journal = journal;
          },
          error: (error) => console.error('There was an error!', error)
        });
        this.tacheJournalService.findAllTachesByIdJournal(id).subscribe({
          next: (src: TacheJournal[]) => {
            console.log(src);

            this.taches = src;
          },
          error: (error) => console.error('There was an error!', error)
        });

      }



    });


  }


  updatevalidtache (tache: TacheJournal): void {
    this.tacheJournalService.updateValidTache(tache.idtache,tache).subscribe(
      () => {
        // On success, change the convention's validity status and update the UI
        tache.valid = true;
        tache.status = Statut.Validé;


      },
      (error) => {
        console.error('Error validating convention', error);
      }
    );
  }


  updatenonvalidtache (tache: TacheJournal): void {
    this.tacheJournalService.updateNonValidtache(tache.idtache,tache).subscribe(
      () => {
        // On success, change the convention's validity status and update the UI
        tache.valid = false;
        tache.status = Statut.NonValidé;


      },
      (error) => {
        console.error('Error validating convention', error);
      }
    );
  }



}
