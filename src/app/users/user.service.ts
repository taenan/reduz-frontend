import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = '/api/users';

  userLogged!: User

  constructor(
    private http: HttpClient
    ) { }

  public findById(id: number) {
    return this.http.get<User>(`${this.API}/${id}`).pipe(first());
  }

  public changePassword(id: number, credentials: any) {
    return this.http.put(`${this.API}/${id}/changePassword`, credentials).pipe(first());
  }
}
