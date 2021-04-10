import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent implements OnInit {

  email: string;
  userID: string;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    this.userID = this.route.snapshot.paramMap.get('userid');
  }

  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    if (code.length < 6) {
      return;
    }

    let errMsg = "Could not activate account. Please retry.";
    let errTitle = "Account Activation Error";

    this.userService.validateRegistration(code, this.userID).pipe(first()).subscribe(result => {
      if (result == true) {
        this.toastr.show("Account activated successfully!");
        this.router.navigate(["login"]);
      }
      else {
        this.toastr.error(errMsg, errTitle);
      }
    },
      (error) => {
        this.toastr.error(errMsg, errTitle);
      });

  }

  resendCode() {
    let errMsg = "Could not send activation code to: " + this.email + " Please verify your email and retry.";
    let errTitle = "Activation token send error";
    this.userService.resendCode(this.email, this.userID).pipe(first()).subscribe(result => {
        if (result == true) {
          this.toastr.show("Activation code was sent to: " + this.email);
        }
        else {
          this.toastr.error(errMsg, errTitle);
        }
      },
      (error) => {
        this.toastr.error(errMsg, errTitle);
      });
  }
}
