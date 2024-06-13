import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateAccommodationDto } from '../interfaces/accommodation/create-accommodation.dto';
import { AuthService } from '../../authentication/services/auth.service';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Accommodation } from '../interfaces/accommodation/accommodation.interface';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor() { }

  private authService = inject ( AuthService );
  private readonly nestUrl: string = environment.nest;
  private http = inject(HttpClient);
  private readonly endpoint = `${this.nestUrl}/api/v1/accommodations`;

  create(idHotel: string, idRoom: string,body: CreateAccommodationDto){
    const url = `${this.endpoint}/${idHotel}/${idRoom}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });
    return this.http.post(url, body, { headers }).pipe(
      map(() => true),
      catchError((err) => {
        this.handleError(err);
        return of(null);
      })
    );
  }

  getByStartDateAndEndDate(body: CreateAccommodationDto) : Observable<Accommodation[]>{
    const url = `${this.endpoint}`;

    return this.http.post<Accommodation[]>(url,body);
  }

  private handleError(error: any) {
    return throwError( () => new Error(error));
  }
}
