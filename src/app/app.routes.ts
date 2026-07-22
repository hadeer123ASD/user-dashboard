import { Routes } from '@angular/router';
import { UserComponent } from './features/user/user.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserComponent },
  { path: 'users/:id', component: UserDetailsComponent }
];
