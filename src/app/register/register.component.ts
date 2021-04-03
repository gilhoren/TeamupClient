import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {first} from "rxjs/operators";
import {User} from "../model/user";
import {Role} from "../model/role";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userData: User = new class implements User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    token?: string;
  }

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: [  '', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]  ]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.registerUser(this.userData).pipe(first()).subscribe(user => {
      this.loading = false;
      this.router.navigate(["verify", { userid: user }]);
    });

  }
}
