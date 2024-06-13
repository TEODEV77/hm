import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Hotel } from '../interfaces/hotel/hotel.interface';
import { CreateHotelDto } from '../interfaces/hotel/create-hotel.dto';
import { UpdateHotelDto } from '../interfaces/hotel/update-hotel.dto';
import { AuthService } from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor() {}

  private authService = inject(AuthService);
  private readonly nestUrl: string = environment.nest;
  private http = inject(HttpClient);
  private readonly endpoint = `${this.nestUrl}/api/v1/hotels`;

  private _hotelSelected = signal<Hotel | null>(null);
  public hotelSelected = computed(() => this._hotelSelected());

  getOwnerHotels(): Observable<Hotel[]> {
    const url = this.endpoint;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.get<Hotel[]>(url, {
      headers,
    });
  }

  setHotel(hotel: Hotel) {
    this._hotelSelected.set(hotel);
  }

  createHotel(body: CreateHotelDto): Observable<boolean> {
    const url = this.endpoint;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http
      .post(url, body, {
        headers,
      })
      .pipe(
        map(() => true),
        catchError((err) => {
          return throwError(() => console.log(err));
        })
      );
  }

  updateHotel(
    id: string | undefined,
    body: UpdateHotelDto
  ): Observable<boolean> {
    const url = `${this.endpoint}/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });
    return this.http
      .patch(url, body, {
        headers,
      })
      .pipe(
        tap(() => {}),
        map(() => true),
        catchError((err) => {
          return throwError(() => console.log(err));
        })
      );
  }
}
