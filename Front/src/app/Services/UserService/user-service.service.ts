import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {KeycloakUser, keyCredential} from "../../Modules/UserModule/KeycloakUserRep";
import {User, UserWrapper} from "../../Modules/UserModule/User";
import {ApiResponse} from "../../Modules/UserModule/ApiResponse";

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  message: string = '';
  isRedirected = false;
  response: ApiResponse = {} as ApiResponse;
  url: string = "http://localhost:9090/api/service/user";
  currentUser: any = {};

  constructor(private http: HttpClient, private keycloakService: KeycloakService, private router: Router) {
    /*  this.keycloakService.keycloakEvents$.pipe(
         filter(event => event.type === KeycloakEventType.OnAuthSuccess),
         tap(() => this.redirectAfterLogin())
       ).subscribe();*/

    this.keycloakService.getKeycloakInstance().onTokenExpired = () => {
      console.log('Token expired');
      this.updateTokenOnFailure();
    }
  }

  private async updateTokenOnFailure() {
    try {
      const newToken = await this.keycloakService.getKeycloakInstance().updateToken(5); // Adjust time as needed
      console.log('Token refreshed explicitly:', newToken);
      // Update user data if needed
    } catch (error) {
      console.error('Failed to refresh token (both silent and explicit):', error);
      // Handle complete refresh failure (e.g., prompt user for re-authentication)
    }
  }

  redirectAfterLogin() {
    console.log('Redirected = ' + this.isRedirected);
    if (!this.isRedirected) {
      const isAuthenticated = this.keycloakService.isLoggedIn();
      if (isAuthenticated) {
        const userRoles = this.keycloakService.getUserRoles();
        if (userRoles.includes('SuperAdmin') || userRoles.includes('Agentesprit')) {
          console.log('Redirecting to admin');
          this.router.navigate(['/admins']);
          this.isRedirected = true;
          console.log('Redirected = ' + this.isRedirected);
        } else {
          console.log('Redirecting to user');
          this.router.navigate(['/user']);
          this.isRedirected = true;
        }
      } else {
        console.log('not connected');
      }
    }
  }


  adduser(u: User, password: string, role: string, fn: string, ln: string) {
    let creds = new keyCredential('password', password, true);
    let realmrole = [];
    realmrole.push(role)
    let keyUser: KeycloakUser = new KeycloakUser(u.login, true, u.email, [creds], realmrole, fn, ln);
    let userWrapper: UserWrapper = new UserWrapper(keyUser, u);
    //console.log('UserWrapper object:', userWrapper);
    console.log('UserWrapper JSON:', JSON.stringify(userWrapper));
    return this.http.post<ApiResponse>(this.url + '/CreateUser', userWrapper).pipe();
  }

  getCurrentUser(): Promise<any> {
    const keycloak = this.keycloakService.getKeycloakInstance();
    if (keycloak.authenticated) {
      return keycloak.loadUserInfo()
        .then(userInfo => {
          this.currentUser = userInfo; // Save user info in a variable
          console.log('Current user:', this.currentUser);
          return this.currentUser;
        });
    } else {
      // If the user is not authenticated, return a rejected Promise or handle the case accordingly
      return Promise.reject('User is not authenticated');
    }
  }



  getUsers() {
    return this.http.get<User[]>(this.url + '/GetAllUsers');
  }

  getUserWarpperByEmail(email: String) {
    return this.http.get<UserWrapper>(this.url + '/GetUserByEmail/' + email);
  }

  updateUser(u: User, role: string, fn: string, ln: string) {
    let keyUser: KeycloakUser = new KeycloakUser(u.login, true, u.email, [], [role], fn, ln);
    let userWrapper: UserWrapper = new UserWrapper(keyUser, u);
    console.log('UserWrapper object:', userWrapper);
    return this.http.put<ApiResponse>(this.url + '/UpdateUser', userWrapper).pipe();

  }

  deleteUser(username: string) {
    return this.http.delete<ApiResponse>(this.url + '/DeleteUser/' + username).pipe();
  }


}
