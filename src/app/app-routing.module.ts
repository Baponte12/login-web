import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@components/pages/login/login.component';
import { TaskComponent } from '@components/pages/task/task.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule {}
