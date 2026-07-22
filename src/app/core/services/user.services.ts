
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getUsers(limit: number, skip: number): Observable<{ users: User[]; total: number }> {
    return this.http.get<any>(`${this.baseUrl}?limit=${limit}&skip=${skip}`).pipe(
      map(res => ({ users: res.users, total: res.total }))
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
