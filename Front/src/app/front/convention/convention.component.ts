import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConventionService } from '../../Services/ConventionService/convention.service';
import {UserServiceService} from "../../Services/UserService/user-service.service";

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css']
})
export class ConventionComponent implements OnInit {
  conventionForm: FormGroup;
  isConventionAdded: boolean = false;
  email : string  = '';
  idUser : number=0;

  constructor(private conventionService: ConventionService, private UserService: UserServiceService) {
    this.conventionForm = new FormGroup({
      nomEntreprise: new FormControl('', Validators.required),
      dateDebut: new FormControl('', Validators.required),
      dateFin: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      numTel: new FormControl('', [Validators.required, Validators.pattern(/^(\+216)?[2-9]\d{7}$/)]),
      nomEncadrant: new FormControl('', Validators.required),
      emailEncadrant: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.subscribeToFormChanges();
    this.getCurrentUser();
    console.log("from init ! : "+this.idUser);


  }

  subscribeToFormChanges(): void {
    // Example: Subscribe to changes in 'nom_entreprise' field
    this.conventionForm.get('nom_entreprise')?.valueChanges.subscribe(value => {
      console.log('Nom de l\'entreprise changed:', value);
      // Perform any action based on the new value
    });

    // Add more subscriptions as needed for other fields
  }

  getCurrentUser() {
    this.UserService.getCurrentUser()
      .then(userInfo => {
        this.email = userInfo.email;
        console.log(this.email);

        this.UserService.getUserWarpperByEmail(this.email).subscribe(user => {
          this.idUser = user.user.id_User;
          console.log("responce   "+  this.idUser);

        });

      })
      .catch(error => {
        console.error(error); // Handle errors here
      });
  }
  submitForm() {
    if (this.conventionForm.valid) {
      console.log("from submit: " + this.idUser);
      console.log("convention from angular " + this.conventionForm.value);

      // Submit the form data to the backend
      this.conventionService.addConventionAndAssignToUser(this.conventionForm.value, this.idUser).subscribe({
        next: (response) => {
          console.log('Convention added and assigned to user:', response);
          this.conventionForm.reset();
          this.isConventionAdded = true;

          // After successful form submission, trigger the PDF download
          this.conventionService.downloadPdf(response.idConvention).subscribe(blob => {
            // Create a new Blob object using the response data
            const pdfBlob = new Blob([blob], { type: 'application/pdf' });

            // Create a link element, set the href to the object URL, and force a download
            const downloadURL = window.URL.createObjectURL(pdfBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadURL;
            downloadLink.download = `convention_${response.idConvention}.pdf`;
            downloadLink.click();

            // Clean up by revoking the object URL after triggering the download
            window.URL.revokeObjectURL(downloadURL);
          });
        },
        error: (error) => {
          console.error('Error adding and assigning convention:', error);
        }
      });
    } else {
      console.error('Form is not valid');
    }
  }
}
