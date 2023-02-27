import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, first, switchMap, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/users/model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = '/api/auth';
  private readonly ACCESS_TOKEN_STORAGE_KEY = "reduz_auth_access_token"
  private readonly REFRESH_TOKEN_STORAGE_KEY = "reduz_refresh_access_token"
  private authenticated$ = new BehaviorSubject<boolean>(false)
  userLogged!: User

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  public login(user: Partial<User>) {
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY)
    return this.http.post(`${this.API}/login`, user).pipe(
      first(),
      tap((response: any) => {
        this.handleTokens(response);
      }),
      switchMap(response => this.userService.findById(response.userId).pipe(
        tap(user => this.userLogged = user)
      ))
    );
  }

  public logout() {
    this.removeTokens()
    this.router.navigate(['/login']);
  }

  public register(record: Partial<User>) {
    return this.http.post(`${this.API}/register`, record).pipe(first());
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authenticated$.asObservable().pipe(filter((val) => val !== null));
  }

  public getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY);
  }

  public refreshToken() {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY);
    return this.http.post(`${this.API}/token`, { refreshToken: refreshToken }).pipe(
      first(),
      tap((response: any) => {
        this.handleTokens(response)
      })
    );
  }

  public removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_STORAGE_KEY)
    this.authenticated$.next(false)
  }

  private handleTokens(response: any) {
    if (response.accessToken) {
      localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, response.accessToken)
      localStorage.setItem(this.REFRESH_TOKEN_STORAGE_KEY, response.refreshToken)
      this.authenticated$.next(true)
    } else {
      this.authenticated$.next(false)
    }
  }

}
