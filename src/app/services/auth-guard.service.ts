import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if ( !this.auth.getToken() ) {
      this.router.navigateByUrl( '/log-in' );
      return false;
    }
    return true;
  }
}
