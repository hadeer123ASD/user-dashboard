
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { initialState } from './users.state';

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.loadUsers, state => ({ ...state, loading: true })),
  on(UsersActions.loadUsersSuccess, (state, { users, total }) => ({
    ...state,
    users,
    total,
    loading: false
  })),
  on(UsersActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false
  }))
);
