
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { selectSelectedUser } from '../../store/users/users.selectors';
import { loadUserById } from '../../store/users/users.actions';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
      MatDividerModule 
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  ngOnInit() {
    this.user$ = this.store.select(selectSelectedUser);
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = Number(idParam);
      this.store.dispatch(loadUserById({ id }));
    }
  }

  back() {
    this.router.navigate(['/users']);
  }
}
