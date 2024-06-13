import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { CreateAccommodationDto } from '../../../admin/interfaces/accommodation/create-accommodation.dto';
import { AccommodationService } from '../../../admin/services/accommodation.service';
import { Accommodation } from '../../../admin/interfaces/accommodation/accommodation.interface';
import { ReservationDetailsDto } from '../../../reservation/interfaces/reservation-details.dto';
import { ReservationService } from '../../../reservation/services/reservation.service';
import { User } from '../../../authentication/interfaces/user.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-book-layout',
  templateUrl: './book-layout.component.html',
  styleUrl: './book-layout.component.css'
})
export class BookLayoutComponent implements OnInit {

  private formBuilder = inject( FormBuilder );
  private authService = inject ( AuthService );
  private accommodationService = inject ( AccommodationService );
  private reservationService = inject ( ReservationService );
  private router = inject (Router);
  public currentUser = signal<User | null> (null);


  public accommodations : Accommodation [] = [];

  ngOnInit(): void {
    this.currentUser.set(this.authService.currentUser());
  }

  public navigateSignIn(){
    this.authService.navigateSignIn();
  }

  public navigateSignUp(){
    this.authService.navigateSignUp();
  }


  public bookingForm : FormGroup = this.formBuilder.group ({
    start_date: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
  });

  getByStartDateAndEndDate(){
    const body : CreateAccommodationDto = {
      start_date: this.bookingForm.get('start_date')?.value,
      end_date: this.bookingForm.get('end_date')?.value,
    };
    this.accommodationService.getByStartDateAndEndDate(body).subscribe({
      next: (accommodations: Accommodation []) => {
        this.accommodations = accommodations;
        if(this.accommodations.length == 0){
          Swal.fire('No hotels and rooms available', 'Please try with different dates', 'warning');
        }
      }
    });
  }

  book(accommodation: Accommodation){
    this.bookingForm.get('start_date')?.value;
    this.bookingForm.get('end_date')?.value;
    const { hotel, room } = accommodation;

    const reservationDetails: ReservationDetailsDto = {
      start_date: this.bookingForm.get('start_date')?.value,
      end_date: this.bookingForm.get('end_date')?.value,
      room,
      hotel
    }

    this.reservationService.setReservationDetails(reservationDetails);
    this.router.navigate(['/reservation']);

  }


}
