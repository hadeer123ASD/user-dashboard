import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ limit: number; skip: number }>()
);

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[]; total: number }>()
);

export const loadUserById = createAction(
  '[Users] Load User By Id',
  props<{ id: number }>()
);

export const loadUserByIdSuccess = createAction(
  '[Users] Load User By Id Success',
  props<{ user: User }>()
);

