import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import {Famer} from "../model/Famer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  currentUser: User;
  userFromApi: User;
  famers:Famer[] =
  [
    {name: "Pini Gershon", date: "21-03-2021" , fame: "Cook", avatar: "spyro.png"},
    {name: "Shula S", date: "15-02-2021" , fame: "Development", avatar: "smith.png"},
    {name: "Bobi M", date: "10-02-2021" , fame: "Mentoring", avatar: "rick-sanchez.png"},
    {name: "Gil H", date: "01-01-2021" , fame: "Solving Problems", avatar: "avatar.png"},

  ];


  constructor(
      private userService: UserService,
      private authenticationService: AuthenticationService
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
      this.loading = true;
      this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
          this.loading = false;
          this.userFromApi = user;
      });
  }

}
