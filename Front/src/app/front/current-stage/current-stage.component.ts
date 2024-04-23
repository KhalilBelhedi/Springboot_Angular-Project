import { Component } from '@angular/core';
import {Convention} from "../../Modules/ConventionModule/Convention.module";
import {ConventionService} from "../../Services/ConventionService/convention.service";
import {Stage} from "../../Modules/StageModule/Stage.module";
import {UserServiceService} from "../../Services/UserService/user-service.service";

@Component({
  selector: 'app-current-stage',
  templateUrl: './current-stage.component.html',
  styleUrl: './current-stage.component.css'
})
export class CurrentStageComponent {
  stage: Stage[] = [];
  idUser : number=0;
  email : string  = '';
  constructor(private conventionService: ConventionService,private UserService: UserServiceService) { }


  ngOnInit(): void {
     this.getCurrentUser();
    console.log("this is the user id from init :  " + this.idUser  )

    // this.conventionService.getStageByUser(this.idUser).subscribe(stage => {
    //   this.stage = stage;
    // });

  }

  getCurrentUser() {
    this.UserService.getCurrentUser()
      .then(userInfo => {
        this.email = userInfo.email;
        console.log(this.email);

        this.UserService.getUserWarpperByEmail(this.email).subscribe(user => {
          this.idUser = user.user.id_User;

          console.log("responce   "+  this.idUser);
          this.getAllStageForCurrentUser();


        });

      })
      .catch(error => {
        console.error(error); // Handle errors here
      });

  }


  getAllStageForCurrentUser(){
    this.conventionService.getStageByUser(this.idUser).subscribe(stage => {
      this.stage = stage;
      console.log("this is the user id from getAllStageForCurrentUser :  " + this.idUser  )

    });
  }
  onFileSelected(event: any, stage: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      stage.selectedFile = file; // Temporarily hold selected file in stage object
    }
  }

  uploadFile(stage: any) {
    if (stage.selectedFile) {
      const formData = new FormData();
      formData.append('file', stage.selectedFile);

      this.conventionService.uploadStageReport(stage.idStage, formData).subscribe({
        next: (response) => {
          console.log('file uploaded successfully', response);
          stage.nom_fichier_rapport = response.filePath; // Update the path after successful upload
          console.log(stage)

        },
        error: (error) => console.error('Error uploading file:', error)
      });
    }
  }
}
