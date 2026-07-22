import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { UsersService } from '../../core/services/user.services';
import { inject } from '@angular/core';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions); // ✅ inject Actions in standalone

  private usersService = inject(UsersService); // ✅ inject service in standalone

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(action =>
        this.usersService.getUsers(action.limit, action.skip).pipe(
          map(res => UsersActions.loadUsersSuccess({ users: res.users, total: res.total }))
        )
      )
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUserById),
      switchMap(action =>
        this.usersService.getUserById(action.id).pipe(
          map(user => UsersActions.loadUserByIdSuccess({ user }))
        )
      )
    )
  );
}
