import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { ReservationDetailsDto } from '../../interfaces/reservation-details.dto';
import { EmergencyContact } from '../../interfaces/emergency-contact.interface';
import { ReservationDto } from '../../interfaces/reservation.dto';
import { ValidEmailRegex } from '../../../authentication/validators/email.validator';
import { MailService } from '../../services/mail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  public reservationForm: FormGroup;
  private router = inject(Router);
  private mailService = inject( MailService);
  private formBuilder = inject(FormBuilder);
  private reservationService = inject( ReservationService);
  private reservationDetails = signal<ReservationDetailsDto | null>(null);

  constructor() {
    this.reservationForm = this.formBuilder.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      guests: this.formBuilder.array([]),
      full_name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.reservationDetails.set(this.reservationService.reservationDetails());
    this.reservationForm.get('start_date')?.setValue(this.reservationDetails()?.start_date);
    this.reservationForm.get('end_date')?.setValue(this.reservationDetails()?.end_date);
    this.addGuestForm();
  }

  get guests() {
    return this.reservationForm.get('guests') as FormArray;
  }

  addGuestForm() {
    const guestForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birth_date: ['', Validators.required],
      gender: ['', Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(ValidEmailRegex())]],
      phone: ['', Validators.required]
    });
    this.guests.push(guestForm);
  }

  removeGuest(index: number) {
    this.guests.removeAt(index);
  }

  submit() {
    const emergency_contact : EmergencyContact = {
      full_name: this.reservationForm.get('full_name')?.value,
      phone: this.reservationForm.get('phone')?.value
    }

    const reservation : ReservationDto = {
      start_date: this.reservationForm.get('start_date')?.value,
      end_date: this.reservationForm.get('end_date')?.value,
      check_in: this.reservationForm.get('start_date')?.value,
      check_out: this.reservationForm.get('end_date')?.value,
      number_of_people: this.guests.length,
      guests: this.guests.value,
      emergency_contact
    }

    const idHotel: string  = this.reservationDetails()?.hotel._id as string;
    const idRoom: string =  this.reservationDetails()?.room._id as string;
    this.reservationService.create(idHotel, idRoom, reservation).subscribe({
      next: (result: any) => {
        if (result){
          this.mailService.sendEmail(result._id).subscribe({
            next: () => {
              Swal.fire('Email Sent', 'Reservation details were sent to your email', 'success');
            }
          });
          this.router.navigate(['/book']);
        }else{
          Swal.fire('Error', 'Hotel/Room Unavailable', 'error');
        }
      },
    });;

  }
}
