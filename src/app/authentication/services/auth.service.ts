import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { LoginResponse } from '../interfaces/login-response';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CreateUserDto } from '../interfaces/create-user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private readonly nestUrl: string = environment.nest;
  private http = inject(HttpClient);
  private readonly endpoint = `${this.nestUrl}/api/v1/auth`;
  private router = inject(Router);

  private _currentUser = signal<User | null>(null);

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public currentUser = computed(() => this._currentUser());


  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.checkToken().subscribe();
      this.isLoggedInSubject.next(true);
    }
  }

  public navigateSignIn(){
    this.router.navigate(['/auth']);
  }

  public navigateSignUp(){
    this.router.navigate(['/auth/register']);
  }


  private setAuthentication(user: User, token: string){
    this._currentUser.set(user);
    this.isLoggedInSubject.next(true);
    localStorage.setItem('token', token);

  }


  login(email: string, password: string): Observable<boolean> {
    const url = `${this.endpoint}/login`;
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body).pipe(
      tap( ({user, token}) => {
        this.setAuthentication(user, token);
      }),
      map( () => true),
      catchError( err => {
        return throwError( () => 'Error');
      })
    );
  }

  register(body: CreateUserDto): Observable<boolean>{
    const url = `${this.endpoint}/register`;
    return this.http.post<User>(url, body).pipe(
      tap( () => {
        this.navigateSignIn();
      }),
      map( () => true),
      catchError( err => {
        return throwError( () => 'Error');
      })
    );
  }

  getAuthToken(){
    return localStorage.getItem('token');
  }

  checkToken(): Observable<boolean>{
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if(token){
      const url = `${this.endpoint}/check-token`;
      return this.http.get<User>(url, {
        headers
      }).pipe(
        tap( user => {
          this.setAuthentication(user,token);
        }),
        map( () => true),
        catchError( err => {
          this.logout();
          return throwError( () => console.log(err));
        })
      );
    } else {
      this.logout();
      return throwError( () => 'Error');
    }
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/auth']);
  }
}
