import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JournalService} from "../../Services/JournalService/journal.service";
import {TacheJournalService} from "../../Services/TacheJournalService/tachejournal.service";
import {MatDialog} from "@angular/material/dialog";
import {TacheJournal} from "../../Modules/TacheJournalModule/TacheJournal.module";
import {Journal} from "../../Modules/JournalModule/Journal.module";

@Component({
  selector: 'app-journalencadrant',
  templateUrl: './journalencadrant.component.html',
  styleUrl: './journalencadrant.component.css'
})
export class JournalencadrantComponent implements OnInit {

  journal: Journal;
  taches: TacheJournal[] = [];
  journals: Journal[] = [];

  constructor(
    private route: ActivatedRoute,
    private journalService: JournalService,
    private tacheJournalService: TacheJournalService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const mailEncadrant = params['mailEncadrant'];
      if (mailEncadrant) {
        this.journalService.GetJournalByEncadrant(mailEncadrant).subscribe({
          next: (jrnls) => {
            console.log(jrnls);
            this.journals = jrnls; // Assurez-vous que this.journals est de type Journal[]
          },
          error: (error) => console.error('There was an error!', error)
        });
      }
    });
  }

  detailjournal(journal) {
    this.router.navigate(['/user/journalDetails', journal.idJournal]);

  }
}
