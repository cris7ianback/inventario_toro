import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      if (this.authService.isRolId()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    this.router.navigate(['/login']);
    window.alert(' Prohibido el ingreso');
    return false;
  }
}
