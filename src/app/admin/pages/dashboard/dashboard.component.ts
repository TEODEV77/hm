import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { User } from '../../../authentication/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  public currentUser = signal<User | null> (null);

  ngOnInit(): void {
    this.currentUser.set(this.authService.currentUser());
  }

  navigateToBook(){
    this.router.navigate(['/book']);
  }

  navigateHotelList() {
    this.router.navigate(['/admin/hotel-list']);
  }

  navigateRoomList() {
    this.router.navigate(['/admin/room-list']);
  }

  createAccommodation() {
    this.router.navigate(['/admin/new-accommodation']);
  }
}
