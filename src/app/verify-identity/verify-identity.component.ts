import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {filter, first, map} from "rxjs/operators";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent implements OnInit {

  email: string;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    // TODO: verify code
    // TODO: on error - display invalid message
    // TODO: on success - display success and
    // TODO: route to login page
    // TODO: send an email with successful registration
    if (code.length < 6) {
      return;
    }
    let userid = this.route.snapshot.paramMap.get('userid');
    this.userService.validateRegistration(code, userid).pipe(first()).subscribe(user => {
    });
    this.router.navigate(["login"]);
  }

  resendCode() {
    alert("Verification code was resent to gil.horen@gmail.com");
  }
}
