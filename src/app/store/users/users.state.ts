
import { User } from "../../core/models/user.model";

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  total: number;
}

export const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  total: 0
};
