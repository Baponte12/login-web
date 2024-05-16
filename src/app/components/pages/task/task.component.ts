import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../../store/app.states';
import { LogOut } from '../../../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Task {
  name: string;
  completed: boolean;
}

@Component( {
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
} )
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  tasks: Task[] = [];
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;

  constructor( private fb: FormBuilder,
               private router: Router,
               private store: Store<AppState> ) {
    this.getState = this.store.select( selectAuthState );
    this.taskForm = this.fb.group( {
      task: ['', Validators.required]
    } );
  }

  ngOnInit(): void {
    this.getState.subscribe( ( state ) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    } );
  }

  addTask() {
    if ( this.taskForm.valid ) {
      const taskName = this.taskForm.get( 'task' ).value;
      const newTask: Task = {
        name: taskName,
        completed: false
      };
      this.tasks.push( newTask );
      this.taskForm.reset();
    }
  }

  removeTask( task: Task ) {
    const index = this.tasks.indexOf( task );
    if ( index !== -1 ) {
      this.tasks.splice( index, 1 );
    }
  }

  logOut(): void {
    this.store.dispatch( new LogOut );
    this.router.navigateByUrl( '/login' );
  }
}
