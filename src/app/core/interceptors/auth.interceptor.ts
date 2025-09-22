import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.auth.getAccessToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.http.post<{ accessToken: string }>("/api/v1/auth/refresh", {}, { withCredentials: true })
            .pipe(
              switchMap(res => {
                this.auth['accessToken'] = res.accessToken;
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${res.accessToken}` }
                });
                return next.handle(retryReq);
              })
            );
        }
        return throwError(() => err);
      })
    );
  }
}