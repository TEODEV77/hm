import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../reservation/services/reservation.service';
import { Reservation } from '../../../reservation/interfaces/reservation.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private reservationService = inject(ReservationService);
  public idHotel: string = '';
  public reservations: Reservation[] = [];
  public total = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idHotel = params['id'];
    });
    this.reservationService.findByHotel(this.idHotel).subscribe({
      next: (reservation: Reservation[]) => {
        this.reservations = reservation;
        this.commission();
      },
    });

  }

  commission(){
    for(let reservation of this.reservations){
      this.total+= reservation.total * ((reservation.hotel.commission)/100)
    }
  }
}
