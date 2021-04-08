import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    registerUser(userData) {
      let response = this.http.post<string>(`${environment.backendBaseUrl}/user/v1/add`, userData);
      return response;
    }

    validateRegistration(code: string, userId: string) {

      let params = new HttpParams();
      params = params.append('token', code);
      params = params.append('id', userId);

      let response = this.http.get(`${environment.backendBaseUrl}/user/v1/regitrationConfirm`, {params: params});
      return response;
    }
}
