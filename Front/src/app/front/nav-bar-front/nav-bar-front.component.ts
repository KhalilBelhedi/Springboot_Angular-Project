import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../../Services/UserService/user-service.service";
import {ConventionService} from "../../Services/ConventionService/convention.service";
import {Stage} from "../../Modules/StageModule/Stage.module";

@Component({
  selector: 'app-nav-bar-front',
  templateUrl: './nav-bar-front.component.html',
  styleUrl: './nav-bar-front.component.css'
})
export class NavBarFrontComponent implements OnInit{

  idUser: number = 0;
  email: string = '';
  stage: Stage[] = [];
  idJournal : number ;
  idStage:number ;
  role : string ;

  constructor(private conventionService: ConventionService,private UserService: UserServiceService,private router: Router, private route: ActivatedRoute, private keycloakService: KeycloakService) {}


  getCurrentUser() {
    this.UserService.getCurrentUser()
      .then(userInfo => {
        this.email = userInfo.email;
        console.log(this.email);
        this.UserService.getUserWarpperByEmail(this.email).subscribe(user => {
          this.idUser = user.user.id_User;
          this.role = user.user.role;

          console.log("responce   " + this.idUser);
          this.conventionService.getStageByUser(this.idUser).subscribe(stage => {
            this.stage = stage;
            console.log(stage);
            if (stage.length > 0) {
              this.idStage = stage.at(0).idStage;
            }
            console.log("this is the user id from getAllStageForCurrentUser :  " + this.idUser  )

          });
        });

      })
      .catch(error => {
        console.error(error); // Handle errors here
      });

  }

  goJournal()
  {
    this.router.navigateByUrl("/user/front/journalstudent/" + this.idStage );
  }



  logout()
  {
    this.keycloakService.logout();
  }

  ngOnInit(): void {
    this.getCurrentUser();

  }
}
