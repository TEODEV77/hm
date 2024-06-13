import { Component, Input } from '@angular/core';
import { Reservation } from '../../../reservation/interfaces/reservation.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {

  @Input() book: Reservation = {} as Reservation;

}
