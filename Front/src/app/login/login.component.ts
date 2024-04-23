import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private keycloak: KeycloakService, private router: Router) {
    if (this.keycloak.isLoggedIn())
    {
      const roles = this.keycloak.getUserRoles();
      if (roles.includes('SuperAdmin') || roles.includes('Agentesprit')) {
        console.log('Redirecting to admin');
        this.router.navigate(['/admins']);
      } else {
        console.log('Redirecting to user');
        this.router.navigate(['/user']);
      }
    }
    else
    {
      this.login();
    }

  }
  login() {
    this.keycloak.login();
  }
}
