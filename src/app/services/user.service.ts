import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    registerUser(userData) : Observable<HttpResponse<User>> {
      return this.http.post<User>(`${environment.backendBaseUrl}/user/v1/add`, userData, {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        observe: 'response'
      });
        //.pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // Return an observable with a user-facing error message.
      return throwError(
        'Something bad happened; please try again later.');
    }

    validateRegistration(code: string, userId: string) {
      let params = new HttpParams();
      params = params.append('token', code);
      params = params.append('id', userId);

      let response = this.http.get(`${environment.backendBaseUrl}/user/v1/regitrationConfirm`, {params: params});
      return response;
    }
}
