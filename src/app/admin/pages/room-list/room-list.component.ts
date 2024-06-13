import { Component, OnInit, inject, signal } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room } from '../../interfaces/room/room.interface';
import { Hotel } from '../../interfaces/hotel/hotel.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit{

  private roomService = inject( RoomService );
  private activatedRoute = inject(ActivatedRoute);
  private router = inject( Router );
  public idHotel = signal<string | null>(null);


  public rooms: Room [] = [];
  public hotels: Hotel [] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.roomService.setIdHotel(params['id']);
    });
    this.roomService.getRoomsByHotel(this.roomService.idHotel()).subscribe({
      next: ( room : Room []) => {
        this.rooms = room;
      },
      error: (error) => console.error('Error fetching hotels:', error)
    });
  }

  createRoom(){
    this.router.navigate(['/admin/new-room',this.roomService.idHotel()]);
  }

  updateRoom(room: Room){
    this.roomService.setRoom(room);
    this.router.navigate(['/admin/update-room']);
  }

  navigateHotels(){
    this.router.navigate(['/admin/hotel-list']);
  }

}
