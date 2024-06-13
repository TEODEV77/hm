import { Component, Input } from '@angular/core';
import { Room } from '../../interfaces/room/room.interface';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {

  @Input() room: Room = {} as Room;
}
