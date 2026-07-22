import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, tap, catchError } from 'rxjs/operators';

import { User } from '../../core/models/user.model';
import { loadUsers } from '../../store/users/users.actions';
import { selectUsers, selectLoading, selectTotal } from '../../store/users/users.selectors';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  filteredUsers$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  total$!: Observable<number>;
  noUsers$!: Observable<boolean>;

  search = new FormControl('');
  private typingLoading$ = new BehaviorSubject<boolean>(false);
  isTyping$ = this.typingLoading$.asObservable();

  limit = 8;
  skip = 0;
  darkMode = false;

  constructor(
    private store: Store,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadData();

    const search$ = this.search.valueChanges.pipe(
      startWith(''),
      tap(() => this.typingLoading$.next(true)),
      debounceTime(400),
      distinctUntilChanged(),
      map(v => v?.toString().toLowerCase().trim() || ''),
      tap(() => this.typingLoading$.next(false))
    );

    const users$ = this.store.select(selectUsers).pipe(
      startWith([]),
      catchError(() => of([]))
    );
    const apiLoading$ = this.store.select(selectLoading).pipe(startWith(false));
    this.total$ = this.store.select(selectTotal).pipe(startWith(0));

    this.filteredUsers$ = combineLatest([users$, search$]).pipe(
      map(([users, search]) => {
        if (!search) return users;
        return users.filter(u =>
          u.firstName.toLowerCase().includes(search) ||
          u.lastName.toLowerCase().includes(search) ||
          (u.role?.toLowerCase().includes(search)) ||
          u.id.toString().includes(search)
        );
      })
    );

    this.loading$ = combineLatest([apiLoading$, this.isTyping$]).pipe(
      map(([apiLoading, typing]) => apiLoading || typing)
    );

    this.noUsers$ = combineLatest([this.filteredUsers$, this.loading$]).pipe(
      map(([users, loading]) => !loading && (!users || users.length === 0))
    );
  }

  loadData(): void {
    this.store.dispatch(loadUsers({ limit: this.limit, skip: this.skip }));
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) this.renderer.addClass(document.body, 'dark-mode');
    else this.renderer.removeClass(document.body, 'dark-mode');
  }

  highlight(text: string | number): string {
    const value = this.search.value?.toString();
    if (!value) return text.toString();
    const regex = new RegExp(`(${value})`, 'gi');
    return text.toString().replace(regex, `<mark>$1</mark>`);
  }

  pageChanged(event: PageEvent): void {
    this.limit = event.pageSize;
    this.skip = event.pageIndex * event.pageSize;
    this.loadData();
  }

  navigateToUser(id: number): void {
    this.router.navigate(['/users', id]);
  }
}


