import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {User} from '../model/user';
import {EmailAndPassword} from "../model/EmailAndPassword";
import {Role} from "../model/role";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(emailAndPassword: EmailAndPassword) {
        return this.http.post<User>(`${environment.backendBaseUrl}/user/v1/authenticate`, emailAndPassword)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.id > 0) {
                    user.role = user.admin == true ? Role.Admin : Role.User;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                } else {
                  var err = "User was not found or password does not match";
                  console.log(err);
                  throw new Error(err);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
