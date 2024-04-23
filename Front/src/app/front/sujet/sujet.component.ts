import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sujet } from '../../../models/sujet.model';
  import { SujetService } from '../../Services/sujet.service';
  import { Router } from '@angular/router';
  import { UserServiceService } from '../../Services/UserService/user-service.service';



@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.scss']
})
export class SujetComponent implements OnInit {

  sujets: Sujet[] = [];
  searchTerm: string = '';
  filterOption: string = '';

  idUser: number = 0;
  email: string = '';
  role: string;
classe : string ;

  constructor(private UserService: UserServiceService ,private sujetService: SujetService, private router: Router) { }

  
  ngOnInit(): void {
    this.getCurrentUser();
}

getCurrentUser() {
    this.UserService.getCurrentUser()
        .then(userInfo => {
            this.email = userInfo.email;
            console.log(this.email);

            this.UserService.getUserWarpperByEmail(this.email).subscribe(user => {
                this.idUser = user.user.id_User;
                this.role = user.user.role;
                this.classe = user.user.classe;
                console.log("responce   " + this.idUser);
                this.fetchSujets(); // Call fetchSujets() here after getting user information
            });

        })
        .catch(error => {
            console.error(error); // Handle errors here
        });
}


  fetchSujets(searchTerm?: string): void {
    // Call the service method with searchTerm as the second parameter
    this.sujetService.getAllSujetsf(this.classe)
      .subscribe(sujets => {
        console.log(sujets); // Log the received data
        this.sujets = sujets;
      });
  }

  onSearch(): void {
    // Call fetchSujets method again with the searchTerm when search button is clicked
    this.fetchSujets(); // No need to pass the searchTerm here
  }

  search(): void {
    this.sujetService.searchSujets(this.searchTerm)
      .subscribe(results => {
        this.sujets = results;
      });
  }


  fetchData(): void {
    // Fetch data based on filter option
    if (this.filterOption === 'nbreEtudiantDesc') {
      this.sujetService.filterByNbretudiantDescending()
        .subscribe(sujets => this.sujets = sujets);
    } else if (this.filterOption === 'nbreEtudiantAsc') {
      this.sujetService.filterByNbretudiantAscending()
        .subscribe(sujets => this.sujets = sujets);
    }else if (this.filterOption === 'dureeStageDesc') {
      this.sujetService.filterByDureeDescending()
        .subscribe(sujets => this.sujets = sujets);
    } else if (this.filterOption === 'dureeStageAsc') {
      this.sujetService.filterByDureeAscending()
        .subscribe(sujets => this.sujets = sujets);
    } else {
      // Fetch all subjects if no filter option selected
      this.sujetService.getSujets()
        .subscribe(sujets => this.sujets = sujets);
    }
  }

  applyFilter(): void {
    // Fetch data when filter option changes
    this.fetchData();
  }

  postuler(idsujet: number): void {
    this.router.navigate(['/user/postuler', idsujet]);
  }


}
