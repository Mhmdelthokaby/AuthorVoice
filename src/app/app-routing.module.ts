import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthorComponent } from './pages/author/author.component';
import { PublishingHouseComponent } from './pages/publishing-house/publishing-house.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'publishing-house', component: PublishingHouseComponent },
  { path: '**', redirectTo: '' }, // fallback to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
