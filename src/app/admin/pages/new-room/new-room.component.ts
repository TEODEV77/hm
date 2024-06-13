import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateRoomDto } from '../../interfaces/room/create-room.dto';
import { RoomService } from '../../services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrl: './new-room.component.css'
})
export class NewRoomComponent implements OnInit{

  private formBuilder = inject( FormBuilder );
  private activatedRoute = inject( ActivatedRoute);
  private roomService = inject( RoomService );
  private router = inject (Router);
  private idHotel: string = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idHotel = params['id'];
    });
  }

  public roomForm : FormGroup = this.formBuilder.group ({
    name: ['', [Validators.required]],
    floor: ['', [Validators.required]],
    type: ['', [Validators.required]]
  });

  createRoom(){
    const body: CreateRoomDto = {
      name: Number(this.roomForm.get('name')?.value),
      floor: Number(this.roomForm.get('floor')?.value),
      type: this.roomForm.get('type')?.value,
    };
    this.roomService.create(this.idHotel,body).subscribe({
      next: ( result ) => {
        if( result ) {
          Swal.fire('Room created', 'The Room has been created', 'success');
          this.router.navigate(['/admin/room-list',this.idHotel]);
        }else {
          Swal.fire('Error', 'Hotel already exists', 'info');
        }
      },
      error: () => {
        Swal.fire('Error', 'An error has occurred', 'error');
      },
    });
  }

  navigateRooms(){
    this.router.navigate(['/admin/room-list', this.idHotel]);
  }

}
