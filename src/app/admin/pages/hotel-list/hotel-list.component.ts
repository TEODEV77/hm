import { Component, OnInit, inject } from '@angular/core';
import { HotelService } from '../../services/hotel-service.service';
import { Router } from '@angular/router';
import { Hotel } from '../../interfaces/hotel/hotel.interface';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent implements OnInit{

  private hotelService = inject(HotelService);

  private router = inject(Router);

  public hotels : Hotel [] = [];

  ngOnInit() {
    this.hotelService.getOwnerHotels().subscribe({
      next: ( hotel : Hotel []) => {
        this.hotels = hotel;
      },
      error: (error) => console.error('Error fetching hotels:', error)
    });
  }

  navigateCreateHotel(){
    this.router.navigate(['/admin/new-hotel']);
  }

  roomsByHotel(id: string){
    this.router.navigate(['/admin/room-list', id]);
  }

  bookingsByHotel(id: string){
    this.router.navigate(['/admin/bookings', id]);
  }

  update(hotel: Hotel){
    this.hotelService.setHotel(hotel);
    this.router.navigate(['/admin/update-hotel']);
  }
}
