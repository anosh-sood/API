// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UserFormComponent } from './userform/userform.component';
import { UserListComponent } from './userlist/userlist.component';

export const routes: Routes = [
  { path: '', component: UserFormComponent },
  { path: 'users', component: UserListComponent }
];