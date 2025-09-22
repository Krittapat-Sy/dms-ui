import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;
  private currentUser: { id: number; email: string; role: string } | null = null;

  constructor(private http: HttpClient, private router: Router) { }
  private apiUrl = 'http://localhost:3000/api/v1/auth';

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(res => {
          this.accessToken = res.accessToken;
          this.currentUser = res.user;
        })
      );
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.clearSession();
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.clearSession();
      }
    });
  }

  private clearSession(): void {
    this.accessToken = null;
    this.currentUser = null;
  }

  refreshToken(): Observable<any> {
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/refresh`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(res => {
        this.accessToken = res.accessToken;
      })
    );
  }

}
