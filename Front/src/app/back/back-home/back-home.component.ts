
import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../Services/UserService/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../Modules/UserModule/User";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-back-home',
  templateUrl: './back-home.component.html',
  styleUrl: './back-home.component.css'
})
export class BackHomeComponent implements OnInit
{
  message: string = '';
  username : string = '';
  welcome: string = "Welcome to the back office";
  userList : User[] = [];
  email : string  = '';
  idUser : number=0;
  constructor(private UserService: UserServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {
  }
  sidebarExpanded = true;

  ngOnInit() {
    this.UserService.getUsers().subscribe(users => {
      this.userList = users;
    });
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.UserService.getCurrentUser()
      .then(userInfo => {
        this.username = userInfo.preferred_username;
        this.email = userInfo.email;

        this.UserService.getUserWarpperByEmail(this.email).subscribe(user => {
          this.idUser = user.user.id_User;
        });
          this.welcome = "hello " + this.username;
      })
      .catch(error => {
        console.error(error); // Handle errors here
      });
  }

  getCurrentUserId(){

  }
  updateUser(user: User) {
    this.router.navigate(['/admins/update', user.email]);
  }

  deleteUser(user: User) {
    this.UserService.deleteUser(user.email).subscribe(response => {
      if (response.success) {
        console.log(response.message);
        this.UserService.getUsers().subscribe(users => {
          this.userList = users; // Update the component's user list
        });
        this.message = response.message;
        this.toastr.success(response.message, 'Success');
      } else {
        console.log(response.message);
        this.message = response.message;
        this.toastr.error(response.message, 'Error');
      }
    });
  }
}
