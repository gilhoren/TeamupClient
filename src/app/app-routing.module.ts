import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ImagesComponent } from './images/images.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from 'src/app/model/role';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {RegisterComponent} from "./register/register.component";
import {VerifyIdentityComponent} from "./verify-identity/verify-identity.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
  { path: 'images', component: ImagesComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'verify', component: VerifyIdentityComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, ContactsComponent, ImagesComponent, AdminComponent, LoginComponent]
