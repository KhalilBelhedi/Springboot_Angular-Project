import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../../Services/UserService/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile-back',
  templateUrl: './profile-back.component.html',
  styleUrl: './profile-back.component.css'
})
export class ProfileBackComponent implements OnInit{

  user : any = {};
  username : string = '';
  constructor(private UserService: UserServiceService,
              private router: Router,
              private route: ActivatedRoute,
            ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.UserService.getCurrentUser()
      .then(userInfo => {
        this.username = userInfo.preferred_username;
      })
      .catch(error => {
        console.error(error); // Handle errors here
      });
  }



}
