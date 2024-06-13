import { Component, Input } from '@angular/core';
import { Hotel } from '../../interfaces/hotel/hotel.interface';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.css'
})
export class HotelCardComponent {

  @Input() hotel: Hotel = {} as Hotel;
}
