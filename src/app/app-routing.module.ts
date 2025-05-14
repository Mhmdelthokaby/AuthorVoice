import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthorComponent } from './pages/author/author.component';
import { PublishingHouseComponent } from './pages/publishing-house/publishing-house.component';
import { AutherLoginComponent } from './pages/auther-login/auther-login.component';
import { AutherSignupComponent } from './pages/auther-signup/auther-signup.component';
import { LoginPublishingHouseComponent } from './components/PublishingHouse/login-publishing-house/login-publishing-house.component';
import { SignupPublishingHouseComponent } from './components/PublishingHouse/signup-publishing-house/signup-publishing-house.component';

import { AuthorGuard } from './guards/author.guard';
import { PublishingHouseGuard } from './guards/publishing-house.guard';
import { AdminProfileComponent } from './components/Admin/admin-profile/admin-profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { 
    path: 'author', 
    component: AuthorComponent, 
    canActivate: [AuthorGuard]
  },
  { 
    path: 'publishing-house', 
    component: PublishingHouseComponent, 
    canActivate: [PublishingHouseGuard]
  },
  { path: 'author‑login', component: AutherLoginComponent },
  { path: 'author‑signup', component: AutherSignupComponent },
  { path: 'publish-login' , component: LoginPublishingHouseComponent },
  { path: 'publish-signup' , component: SignupPublishingHouseComponent },
  { path: 'admin' , component:AdminProfileComponent},
  { path: '**', redirectTo: '' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
