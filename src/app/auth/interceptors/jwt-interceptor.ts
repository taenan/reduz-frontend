import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token && !request.url.startsWith('/api/links/public/') && !request.url.startsWith('/api/auth/')) {
      request = this.addTokenHeader(request, token)
    }

    return next.handle(request).pipe(
      catchError(e => {
        if (e.status === 401) {
          return this.handleRefrehToken(request, next);
        }
        return throwError(() => e)
      })
    )
  }

  private handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((data: any) => {
        return next.handle(this.addTokenHeader(request, data.accessToken))
      }),
      catchError(e => {
        this.authService.logout();
        return throwError(() => e)
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: String | null) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

}
