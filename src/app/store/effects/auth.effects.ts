import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess } from '../actions/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  LogIn$ = createEffect( () => this.actions$.pipe(
    ofType( AuthActionTypes.LOGIN ),
    switchMap( ( action: LogIn ) => {
      console.log( action );
      return this.authService.logIn( action.payload.email, action.payload.password )
        .pipe(
          map( ( user ) => {
            console.log( user );
            return new LogInSuccess( { token: user.token, email: action.payload.email } );
          } ),
          catchError( ( error ) => {
            console.log( error );
            return of( new LogInFailure( { error } ) );
          } )
        );
    } )
  ) );

  LogInSuccess$ = createEffect( () => this.actions$.pipe(
    ofType( AuthActionTypes.LOGIN_SUCCESS ),
    tap( ( action: LogInSuccess ) => {
      localStorage.setItem( 'token', action.payload.token );
      this.router.navigateByUrl( '/task' );
    } )
  ), { dispatch: false } );

  LogInFailure$ = createEffect( () => this.actions$.pipe(
    ofType( AuthActionTypes.LOGIN_FAILURE ),
    tap( () => {
      console.log( 'Login failure occurred' );
    } )
  ), { dispatch: false } );

  LogOut$ = createEffect( () => this.actions$.pipe(
    ofType( AuthActionTypes.LOGOUT ),
    tap( () => {
      localStorage.removeItem( 'token' );
    } )
  ), { dispatch: false } );

}
