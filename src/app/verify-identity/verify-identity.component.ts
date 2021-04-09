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


  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    if (code.length < 6) {
      return;
    }
    let userid = this.route.snapshot.paramMap.get('userid');
    this.userService.validateRegistration(code, userid).pipe(first()).subscribe(result => {
      if (result == true) {
        this.toastr.show("Account activated successfully!");
        this.router.navigate(["login"]);
      }
      else {
        this.toastr.error("Could not activate account. Please retry.", "Account Activation Error");
      }
    },
      (error) => {
        this.toastr.error("Could not activate account. Please retry.", "Account Activation Error");
      });

  }

  resendCode() {
    alert("Verification code was resent to gil.horen@gmail.com");
  }
}
