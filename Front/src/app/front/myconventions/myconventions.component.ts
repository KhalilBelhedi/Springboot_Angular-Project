import {Component} from '@angular/core';
import {Convention} from "../../Modules/ConventionModule/Convention.module";
import {ConventionService} from "../../Services/ConventionService/convention.service";
import {UserServiceService} from "../../Services/UserService/user-service.service";

@Component({
  selector: 'app-myconventions',
  templateUrl: './myconventions.component.html',
  styleUrl: './myconventions.component.css'
})
export class MyconventionsComponent {
  conventions: Convention[] = [];
  idUser: number = 0;
  email: string = '';

  constructor(private conventionService: ConventionService, private UserService: UserServiceService) {
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

          console.log("responce   " + this.idUser);
          this.getAllConventionsByUser();

        });

      })
      .catch(error => {
        console.error(error); // Handle errors here
      });

  }

  getAllConventionsByUser() {
    this.conventionService.getConventionsByUser(this.idUser).subscribe(conventions => {
      this.conventions = conventions;
      console.log("this is the user id from getAllConventionsByUser :  " + this.idUser)

    });

  }
}
