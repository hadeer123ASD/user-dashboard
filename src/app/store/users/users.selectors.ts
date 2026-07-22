
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(selectUsersState, s => s.users);
export const selectLoading = createSelector(selectUsersState, s => s.loading);
export const selectTotal = createSelector(selectUsersState, s => s.total);
export const selectSelectedUser = createSelector(selectUsersState, s => s.selectedUser);
