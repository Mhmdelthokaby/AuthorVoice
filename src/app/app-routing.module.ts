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
import { ChatComponent } from './components/chat/chat.component';
import { AdminSignupComponent } from './components/Admin/admin-signup/admin-signup.component';
import { AdminSigninComponent } from './components/Admin/admin-signin/admin-signin.component';
import { AdminchatComponent } from './components/adminchat/adminchat.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminAuthorViewComponent } from './components/Admin/admin-author-view/admin-author-view.component';
import { AdminPublishingViewComponent } from './components/Admin/admin-publishing-view/admin-publishing-view.component';
import { AdminMainpageComponent } from './components/Admin/admin-mainpage/admin-mainpage.component';
import { LoadingComponent } from './loading/loading.component';


const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  { path: 'loading', component: LoadingComponent },
  { path: 'home', component: HomeComponent },
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
  {
  path: 'admin',
  component: AdminMainpageComponent, // This is the container with <app-admin-nav> + <router-outlet>
  canActivate: [AdminGuard],
  children: [
    { path: '', component: AdminProfileComponent }, // default
    { path: 'author-view/:id', component: AdminAuthorViewComponent },
    { path: 'publishing-view/:id', component: AdminPublishingViewComponent }
  ]
}
,
  { path: 'admin-login' ,component:AdminSigninComponent },
  { path: 'chat' ,component:ChatComponent},
  { path: '**', redirectTo: '' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
