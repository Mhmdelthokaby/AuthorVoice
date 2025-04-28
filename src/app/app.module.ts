import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { CategoryComponent } from './components/category/category.component';
import { AboutsecComponent } from './components/aboutsec/aboutsec.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthorComponent } from './pages/author/author.component';
import { PublishingHouseComponent } from './pages/publishing-house/publishing-house.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AuthorHeroSectionComponent } from './components/author-hero-section/author-hero-section.component';
import { AuthorAboutMeComponent } from './components/author-about-me/author-about-me.component';
import { AuthorBooksComponent } from './components/author-books/author-books.component';
import { AuthorAchievementsComponent } from './components/author-achievements/author-achievements.component';
import { AuthorMediaComponent } from './components/author-media/author-media.component';
import { AuthorQuotesComponent } from './components/author-quotes/author-quotes.component';
import { AuthorEventsComponent } from './components/author-events/author-events.component';
import { AutherLoginComponent } from './pages/auther-login/auther-login.component';
import { AutherSignupComponent } from './pages/auther-signup/auther-signup.component';
import { FormsModule } from '@angular/forms';
import { BookManagementComponent } from './pages/book-management/book-management.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthorService } from './Services/author.service';
import { AuthService } from './Services/auth.service';
import { AuthorFormComponent } from './pages/author-form/author-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    CategoryComponent,
    AboutsecComponent,
    HomeComponent,
    AboutUsComponent,
    AuthorComponent,
    PublishingHouseComponent,
    ContactusComponent,
    AuthorHeroSectionComponent,
    AuthorAboutMeComponent,
    AuthorBooksComponent,
    AuthorAchievementsComponent,
    AuthorMediaComponent,
    AuthorQuotesComponent,
    AuthorEventsComponent,
    AutherLoginComponent,
    AutherSignupComponent,
    BookManagementComponent,
    AdminComponent,
    AuthorFormComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthorService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
