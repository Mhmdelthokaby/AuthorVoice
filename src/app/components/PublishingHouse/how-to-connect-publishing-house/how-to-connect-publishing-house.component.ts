import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to-connect-publishing-house',
  templateUrl: './how-to-connect-publishing-house.component.html',
  styleUrls: ['./how-to-connect-publishing-house.component.css']
})
export class HowToConnectPublishingHouseComponent {
  contacts = [
    {
      title: 'راسلنا عبر البريد الإلكتروني',
      description: 'أرسل لنا بريدًا إلكترونيًا على support@example.com وسنرد عليك خلال 24 ساعة.',
      image: 'assets/images/email.png'
    },
    {
      title: 'اتصل بنا',
      description: 'تواصل معنا عبر الهاتف على +1 (555) 123-4567 من الساعة 9 صباحًا حتى 5 مساءً.',
      image: 'assets/images/phone.png'
    },
    {
      title: 'زرنا شخصيًا',
      description: 'قم بزيارة مكتبنا في 123 شارع الرئيسي، المدينة، البلد. نرحب بالزوار!',
      image: 'assets/images/location.png'
    }
  ];
}
