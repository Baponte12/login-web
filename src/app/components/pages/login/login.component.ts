import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../../store/app.states';
import { LogIn } from '../../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
} )
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor( private store: Store<AppState> ) {
    this.getState = this.store.select( selectAuthState );
  }

  ngOnInit(): void {
    this.getState.subscribe( ( state ) => {
      this.errorMessage = state.errorMessage;
    } );
  }


  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch( new LogIn( payload ) );
  }
}
