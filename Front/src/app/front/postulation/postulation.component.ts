import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostulationService } from '../../Services/postulation.service';
import { User } from '../../../models/user.model';
import { Sujet } from '../../../models/sujet.model';
import {UserServiceService} from "../../Services/UserService/user-service.service";

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.css']
})
export class PostulationComponent implements OnInit {
  postulationForm!: FormGroup;
  isPostulationAdded: boolean = false;
  idsujet: number ;
  idUser: number = 0;
  email: string = '';

  constructor(
    private UserService: UserServiceService,
    private formBuilder: FormBuilder,
    private postulationService: PostulationService,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser()
    // Retrieve the subject ID from route parameters
    this.route.params.subscribe(params => {
      this.idsujet = params['idsujet'];
    });

    // Initialize the form with default values
    this.postulationForm = this.formBuilder.group({
      titrecandidature: ['', Validators.required],
      region: ['', Validators.required],
      datedeb: ['', Validators.required],
      datefin: ['', Validators.required],
      lettremotivation: ['', Validators.required],
      comm: ['', Validators.required],
    });
  }
  getCurrentUser() {
    this.UserService.getCurrentUser()
      .then(userInfo => {
        this.email = userInfo.email;
        console.log(this.email);

        this.UserService.getUserWarpperByEmail(this.email).subscribe(user => {
          this.idUser = user.user.id_User;
          console.log("responce   " + this.idUser);

        });

      })
      .catch(error => {
        console.error(error); // Handle errors here
      });

  }

  submitForm(): void {
    console.log('Form controls:', this.postulationForm.controls);
    console.log('Form values:', this.postulationForm.value);

    if (this.postulationForm.valid) {
      // Send the form data along with the subject ID to the service
      this.postulationService.addPostulation(this.postulationForm.value, this.idsujet, this.idUser).subscribe(
        (response) => {
          console.log('Postulation added:', response);
          this.postulationForm.reset();
          this.isPostulationAdded = true;
        },
        (error) => {
          console.error('Error adding Postulation:', error);
          // Check if the error message received from the backend indicates an invalid period
          if (error === 'Invalid period') {
            // Display a specific error message to the user
            alert('Invalid period. Please check the start and end dates.');
          } else {
            // Handle other errors if needed
          }
        }
      );
    } else {
      console.error('Form is not valid');
      // Output detailed information about invalid form controls (optional)
    }
  }


}
