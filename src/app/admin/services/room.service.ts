import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Room } from '../interfaces/room/room.interface';
import { CreateRoomDto } from '../interfaces/room/create-room.dto';
import { AuthService } from '../../authentication/services/auth.service';
import { UpdateRoomDto } from '../interfaces/room/update-room.dto';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly nestUrl: string = environment.nest;
  private http = inject(HttpClient);
  private readonly endpoint = `${this.nestUrl}/api/v1/rooms`;
  private authService = inject(AuthService);

  private _roomSelected = signal<Room | null>(null);
  public roomSelected = computed(() => this._roomSelected());

  private _idHotel = signal<string | null>(null);
  public idHotel = computed(() => this._idHotel());

  setRoom(room: Room){
    this._roomSelected.set(room);
  }

  setIdHotel(id: string | null){
    this._idHotel.set(id);
  }


  getRoomsByHotel(id: string | null): Observable<Room[]> {
    const url = `${this.endpoint}/${id}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.get<Room[]>(url, { headers });
  }

  create(id: string, body: CreateRoomDto): Observable<boolean | null> {
    const url = `${this.endpoint}/${id}`;

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

  update(id: string | undefined, body: UpdateRoomDto): Observable<boolean | null>{
    const url = `${this.endpoint}/${id}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.patch(url, body, { headers }).pipe(
      map(() => true),
      catchError((err) => {
        this.handleError(err);
        return of(null);
      })
    );
  }

  private handleError(error: any) {
    return throwError( () => new Error(error));
  }
}
