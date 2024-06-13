import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../interfaces/room/room.interface';
import { UpdateRoomDto } from '../../interfaces/room/update-room.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.css'
})
export class UpdateRoomComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private roomService = inject( RoomService);
  private router = inject( Router );
  public roomSelected  = signal<Room | null>(null);
  private idHotel : string | null = ''
  public base : number = 0;

  ngOnInit(): void {
    this.roomSelected.set(this.roomService.roomSelected());
    this.idHotel = this.roomService.idHotel();
    this.updateRoomForm.reset(this.roomSelected());
    this.updateRoomForm.get('type')?.valueChanges.subscribe(selectedType => {
      this.baseCost(selectedType);
      this.updateRoomForm.get('base_cost')?.setValue(this.base);
    })
  }

  public updateRoomForm: FormGroup = this.formBuilder.group({
    name: ['', []],
    floor: ['', []],
    type: ['', []],
    base_cost: [this.base, []],
    status: ['', []],
    taxes: ['', []]
  });

  baseCost(roomType: string) {
    switch (roomType) {
      case 'single':
        this.base = 120;
        break;
      case 'standard':
        this.base = 150;
        break;
      case 'double':
        this.base = 175;
        break;
      case 'suite':
        this.base = 235;
        break;
    }
  }

  navigateRooms(){
    this.router.navigate(['/admin/room-list', this.idHotel]);
  }

  updateRoom(){
    const id = this.roomSelected()?._id;
    const body: UpdateRoomDto = {
      name: Number(this.updateRoomForm.get('name')?.value),
      floor: Number(this.updateRoomForm.get('floor')?.value),
      type: this.updateRoomForm.get('type')?.value,
      status: this.updateRoomForm.get('status')?.value,
      taxes: Number(this.updateRoomForm.get('taxes')?.value),
    };
    this.roomService.update(id,body).subscribe({
      next: ( result ) => {
        if(result){
          Swal.fire('Room updated', 'Room has been updated', 'success');
          this.router.navigate(['/admin/room-list', this.idHotel]);
        }else{
          Swal.fire('Error', 'Room already exists in this hotel', 'info');
        }
      },
      error: () => {
        Swal.fire('Error', 'An error has occurred', 'error');
      }
    });
  }

}
