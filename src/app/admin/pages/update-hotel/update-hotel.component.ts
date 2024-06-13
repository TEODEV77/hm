import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../../interfaces/hotel/hotel.interface';
import { HotelService } from '../../services/hotel-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidEmailRegex } from '../../../authentication/validators/email.validator';
import { UpdateHotelDto } from '../../interfaces/hotel/update-hotel.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrl: './update-hotel.component.css',
})
export class UpdateHotelComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private hotelService = inject(HotelService);

  public hotelSelected = signal<Hotel | null>(null);

  ngOnInit(): void {
    this.hotelSelected.set(this.hotelService.hotelSelected());
    this.updateHotelForm.reset(this.hotelSelected());
  }

  public updateHotelForm: FormGroup = this.formBuilder.group({
    name: [, []],
    email: ['', [Validators.required, Validators.pattern(ValidEmailRegex())]],
    city: ['', []],
    stars: ['', [Validators.min(1), Validators.max(7)]],
    address: ['', []],
    description: ['', []],
    status: ['', []],
    commission: ['', [Validators.min(5), Validators.max(35)]],
  });

  navigateHotels() {
    this.router.navigate(['/admin/hotel-list']);
  }

  updateHotel() {
    const id = this.hotelSelected()?._id;
    const body: UpdateHotelDto = {
      name: this.updateHotelForm.get('name')?.value,
      email: this.updateHotelForm.get('email')?.value,
      city: this.updateHotelForm.get('city')?.value,
      stars: Number(this.updateHotelForm.get('stars')?.value),
      address: this.updateHotelForm.get('address')?.value,
      description: this.updateHotelForm.get('description')?.value,
      status: this.updateHotelForm.get('status')?.value,
      commission: Number(this.updateHotelForm.get('commission')?.value),
    };
    this.hotelService.updateHotel(id, body).subscribe({
      next: () => {
        Swal.fire('Hotel updated', 'The hotel has been updated', 'success');
        this.router.navigate(['/admin/hotel-list']);
      },
      error: () => {
        Swal.fire('Error', 'Hotel already exists', 'info');
      },
    });
  }
}
