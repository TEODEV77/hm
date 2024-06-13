import { Injectable, computed, inject, signal } from '@angular/core';
import { ReservationDetailsDto } from '../interfaces/reservation-details.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReservationDto } from '../interfaces/reservation.dto';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Reservation } from '../interfaces/reservation.interface';
import { AuthService } from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private readonly nestUrl: string = environment.nest;
  private http = inject(HttpClient);
  private authService = inject (AuthService);
  private readonly endpoint = `${this.nestUrl}/api/v1/reservations`;

  private _reservationDetails = signal<ReservationDetailsDto | null>(null);
  public reservationDetails = computed(() => this._reservationDetails());

  public setReservationDetails(reservationDetails: ReservationDetailsDto) {
    this._reservationDetails.set(reservationDetails);
  }

  public create(idHotel: string, idRoom: string, body: ReservationDto){
    const url = `${this.endpoint}/${idHotel}/${idRoom}`;
    return this.http.post(url, body);
  }

  public findByHotel(idHotel: string): Observable<Reservation[]>{
    const url = `${this.endpoint}/${idHotel}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });
    return this.http.get<Reservation[]>(url, { headers });
  }

}
