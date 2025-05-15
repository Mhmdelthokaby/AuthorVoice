import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';  // ngClass, ngIf, ngFor

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
import { AuthService } from './Services/AuthService';
import { AuthorFormComponent } from './pages/author-form/author-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroPublishingHouseComponent } from './components/PublishingHouse/hero-publishing-house/hero-publishing-house.component';
import { AboutusPublishingHouseComponent } from './components/PublishingHouse/aboutus-publishing-house/aboutus-publishing-house.component';
import { ServicesPublishingHouseComponent } from './components/PublishingHouse/services-publishing-house/services-publishing-house.component';
import { DepartmentsPublishingHouseComponent } from './components/PublishingHouse/departments-publishing-house/departments-publishing-house.component';
import { LastestPublishingHouseComponent } from './components/PublishingHouse/lastest-publishing-house/lastest-publishing-house.component';
import { HowtoPublishingHouseComponent } from './components/PublishingHouse/howto-publishing-house/howto-publishing-house.component';
import { TermsPublishingHouseComponent } from './components/PublishingHouse/terms-publishing-house/terms-publishing-house.component';
import { HowToConnectPublishingHouseComponent } from './components/PublishingHouse/how-to-connect-publishing-house/how-to-connect-publishing-house.component';
import { LoginPublishingHouseComponent } from './components/PublishingHouse/login-publishing-house/login-publishing-house.component';
import { SignupPublishingHouseComponent } from './components/PublishingHouse/signup-publishing-house/signup-publishing-house.component';
import { PublishMainFormComponent } from './components/PublishingHouse/Forms/publish-main-form/publish-main-form.component';
import { PublishingTableComponent } from './components/PublishingHouse/Forms/publishing-table/publishing-table.component';
import { AdminProfileComponent } from './components/Admin/admin-profile/admin-profile.component';
import { AdminSigninComponent } from './components/Admin/admin-signin/admin-signin.component';
import { AdminSignupComponent } from './components/Admin/admin-signup/admin-signup.component';
import { AdminchatComponent } from './components/adminchat/adminchat.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdminNavComponent } from './components/Admin/admin-nav/admin-nav.component';
import { AdminAuthorViewComponent } from './components/Admin/admin-author-view/admin-author-view.component';
import { AdminPublishingViewComponent } from './components/Admin/admin-publishing-view/admin-publishing-view.component';
import { AdminMainpageComponent } from './components/Admin/admin-mainpage/admin-mainpage.component';

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
    AuthorFormComponent,
    HeroPublishingHouseComponent,
    AboutusPublishingHouseComponent,
    ServicesPublishingHouseComponent,
    DepartmentsPublishingHouseComponent,
    LastestPublishingHouseComponent,
    HowtoPublishingHouseComponent,
    TermsPublishingHouseComponent,
    HowToConnectPublishingHouseComponent,
    LoginPublishingHouseComponent,
    SignupPublishingHouseComponent,
    PublishMainFormComponent,
    PublishingTableComponent,
    AdminProfileComponent,
    AdminSigninComponent,
    AdminSignupComponent,
    AdminchatComponent,
    ChatComponent,
    AdminNavComponent,
    AdminAuthorViewComponent,
    AdminPublishingViewComponent,
    AdminMainpageComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,CommonModule
  ],
  providers: [AuthorService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
