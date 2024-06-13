import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../../services/hotel-service.service';
import { Hotel } from '../../interfaces/hotel/hotel.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../interfaces/room/room.interface';
import { RoomService } from '../../services/room.service';
import { CreateAccommodationDto } from '../../interfaces/accommodation/create-accommodation.dto';
import { AccommodationService } from '../../services/accommodation.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-accommodation',
  templateUrl: './new-accommodation.component.html',
  styleUrl: './new-accommodation.component.css'
})
export class NewAccommodationComponent implements OnInit {

  private router = inject (Router);
  private formBuilder = inject(FormBuilder);
  private hotelService = inject( HotelService );
  private roomService = inject ( RoomService );
  private accommodationService = inject( AccommodationService );
  public hotels: Hotel [] = [];
  public rooms: Room [] = [];

  ngOnInit(): void {
    this.hotelService.getOwnerHotels().subscribe({
      next: ( list : Hotel []) => {
        this.hotels = list;
      },
      error: (error) => console.error('Error fetching hotels:', error)
    });
    this.accommodationForm.get('hotels')?.valueChanges.subscribe(selectedHotel => {
      this.getRoomsByHotel(selectedHotel);
      this.accommodationForm.get('rooms')?.setValue(this.rooms);
    })
  }

  public accommodationForm: FormGroup = this.formBuilder.group({
    start_date: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    hotels: [this.hotels, []],
    rooms: [this.rooms, []]
  });

  getRoomsByHotel(id: string | null): void {
    this.roomService.getRoomsByHotel(id).subscribe({
      next: ( room : Room []) => {
        this.rooms = room;
      },
      error: (error) => console.error('Error fetching hotels:', error)
    });
  }

  createAccommodation() {
    const body : CreateAccommodationDto = {
      start_date: this.accommodationForm.get('start_date')?.value,
      end_date: this.accommodationForm.get('end_date')?.value,
    };
    const idHotel = this.accommodationForm.get('hotels')?.value;
    const idRoom = this.accommodationForm.get('rooms')?.value;
    this.accommodationService.create(idHotel,idRoom,body).subscribe({
      next: (result) => {
        if (result){
          Swal.fire('Accommodation created', 'Accommodation has been created', 'success');
          this.router.navigate(['/admin']);
        }else{
          Swal.fire('Error', 'Hotel/Room Unavailable', 'error');
        }
      },
    });
  }

}
