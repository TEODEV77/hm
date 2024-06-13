import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  private readonly nestUrl: string = environment.nest;
  private http = inject(HttpClient);
  private readonly endpoint = `${this.nestUrl}/api/v1/mails`;

  public sendEmail(idReservation: string){
    const url = `${this.endpoint}/send-email/${idReservation}`;
    const body = {};
    return this.http.post(url, body);
  }

  private handleError(error: any) {
    return throwError( () => new Error(error));
  }
}
