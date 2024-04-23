import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Sujet} from '../../../models/sujet.model';
import {SujetService} from '../../Services/sujet.service';
import {Router} from '@angular/router';
import {UserServiceService} from "../../Services/UserService/user-service.service";

@Component({
  selector: 'app-sujet-afficher',
  templateUrl: './sujet-afficher.component.html',
  styleUrls: ['./sujet-afficher.component.css']
})
export class SujetAfficherComponent implements OnInit {
  apiUrl: string;
  sujets: Sujet[] = [];
  searchTerm: string = '';
  sujetForm: FormGroup;
  sujetIndexToEdit: number = -1;
  message: string = '';
  selectedSujet: Sujet | null = null;
  updatedSujet: Sujet = new Sujet();
  idadmin: number = 11;
  idUser: number = 0;
  email: string = '';
  role: string;

  constructor(private UserService: UserServiceService, private sujetService: SujetService, private router: Router, private formBuilder: FormBuilder) {
    this.apiUrl = this.sujetService.getApiUrl();

    this.sujetForm = this.formBuilder.group({
      nomentreprise: ['']
    });
  }

  ngOnInit(): void {
    this.getCurrentUser()

  }

  getCurrentUser() {
    this.UserService.getCurrentUser()
      .then(userInfo => {
        this.email = userInfo.email;
        console.log(this.email);

        this.UserService.getUserWarpperByEmail(this.email).subscribe(user => {
          this.idUser = user.user.id_User;
          this.role = user.user.role;
          console.log("responce   " + this.idUser);
          this.fetchSujets();

        });

      })
      .catch(error => {
        console.error(error); // Handle errors here
      });

  }

  fetchSujets(searchTerm?: string): void {
    this.sujetService.getAllSujets(this.idUser, 'mailentreprise', searchTerm || this.searchTerm)
      .subscribe(sujets => {
        this.sujets = sujets;
      });
  }

  supprimerSujet(idSujet: number): void {
    this.sujetService.supprimerSujet(idSujet).subscribe(() => {
      this.message = "Suppression effectuée avec succès.";
      this.fetchSujets();
    });
  }

  afficherFormulaireModifier(index: number): void {
    this.sujetIndexToEdit = index;
    this.selectedSujet = this.sujets[index];
    this.updatedSujet = {...this.selectedSujet};
  }

  modifierSujet(sujet: Sujet): void {
    this.sujetService.updateSujet(sujet).subscribe(() => {
      this.sujetIndexToEdit = -1;
      this.selectedSujet = null;
      this.updatedSujet = new Sujet();
      this.message = "Modification effectuée avec succès.";
    });
  }

  ajouterSujet(): void {
    if (this.role == 'SuperAdmin' || this.role == 'Agentesprit') {
      this.router.navigate(['/admins/ajoutsujet']);
    } else {
      this.router.navigate(['/user/ajoutsujet']);
    }
  }

  search(): void {
    this.sujetService.searchSujets(this.searchTerm)
      .subscribe(results => {
        this.sujets = results;
      });
  }

  displayPostulations(idsujet: number): void {
    this.router.navigate(['/admins/postulation_sujet', idsujet]);
  }

}
