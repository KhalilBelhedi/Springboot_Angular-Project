import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Postulation } from '../../../models/postulation.model';
import { PostulationService } from '../../Services/postulation.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-affich-postulation',
  templateUrl: './affich-postulation.component.html',
  styleUrl: './affich-postulation.component.css'
})
export class AffichPostulationComponent implements OnInit {
  postulations: Postulation[] = [];
  filterOption: string = '';

  constructor(private postulationService: PostulationService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPostulations();
  }

  fetchPostulations(searchTerm?: string): void {
    this.postulationService.getAllPostulations( )
      .subscribe(postulations => {
        console.log(postulations);
        this.postulations = postulations;
      });
  }

  applyFilter(): void {
    this.fetchData(this.filterOption); 
  }
  
  fetchData(filterOption: string): void {
    if (filterOption === 'accepte') {
      this.postulationService.filterByAccepted()
        .subscribe(postulations => this.postulations = postulations);
    } else if (filterOption === 'refuse') {
      this.postulationService.filterByRefused()
        .subscribe(postulations => this.postulations = postulations);
    } else if (filterOption === 'attente') {
      this.postulationService.filterByAttente()
        .subscribe(postulations => this.postulations = postulations);
    } else {
    }
  }
  
  
}
