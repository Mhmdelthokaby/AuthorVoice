import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthorComponent } from './pages/author/author.component';
import { PublishingHouseComponent } from './pages/publishing-house/publishing-house.component';
import { AutherLoginComponent } from './pages/auther-login/auther-login.component';
import { AutherSignupComponent } from './pages/auther-signup/auther-signup.component';
import { AuthorGuard } from './Guards/author.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'author', component: AuthorComponent, canActivate: [AuthorGuard] }, // <--- Protected
  { path: 'publishing-house', component: PublishingHouseComponent },
  { path: 'author-login', component: AutherLoginComponent },
  { path: 'author-signup', component: AutherSignupComponent },
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
