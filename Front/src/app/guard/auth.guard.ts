import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
    console.log("creating auth guard");
  }
  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    console.log("isAccessAllowed : checking access");
    if (!this.authenticated) {
      await this.keycloak.login({ redirectUri: window.location.origin + state.url });
    }

    // Example of role checking logic
    const requiredRoles = route.data['roles'] as string[];
    const userHasRequiredRole = requiredRoles.some(role => this.keycloak.getUserRoles().includes(role));
    console.log(this.keycloak.getUserRoles());
    if (this.authenticated && userHasRequiredRole) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
