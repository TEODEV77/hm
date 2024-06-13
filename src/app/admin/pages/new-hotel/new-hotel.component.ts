import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidEmailRegex } from '../../../authentication/validators/email.validator';
import { Router } from '@angular/router';
import { HotelService } from '../../services/hotel-service.service';
import { CreateHotelDto } from '../../interfaces/hotel/create-hotel.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrl: './new-hotel.component.css',
})
export class NewHotelComponent {
  private formBuilder = inject(FormBuilder);
  private hotelService = inject(HotelService);

  private router = inject(Router);

  public hotelForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: [
      '@hm.com',
      [Validators.required, Validators.pattern(ValidEmailRegex())],
    ],
    city: ['', [Validators.required]],
    stars: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
    address: ['', [Validators.required]],
    description: ['', [Validators.required]],
    commission: [
      '',
      [Validators.required, Validators.min(5), Validators.max(35)],
    ],
  });

  createHotel() {
    const body: CreateHotelDto = {
      name: this.hotelForm.get('name')?.value,
      email: this.hotelForm.get('email')?.value,
      city: this.hotelForm.get('city')?.value,
      stars: Number(this.hotelForm.get('stars')?.value),
      address: this.hotelForm.get('address')?.value,
      description: this.hotelForm.get('description')?.value,
      commission: Number(this.hotelForm.get('commission')?.value),
    };
    this.hotelService.createHotel(body).subscribe({
      next: () => {
        Swal.fire('Hotel created', 'The hotel has been created', 'success');
        this.router.navigate(['/admin/hotel-list']);
      },
      error: () => {
        Swal.fire('Error', 'An error has occurred', 'error');
      },
    });
  }

  returnHotelList() {
    this.router.navigate(['/admin/hotel-list']);
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
