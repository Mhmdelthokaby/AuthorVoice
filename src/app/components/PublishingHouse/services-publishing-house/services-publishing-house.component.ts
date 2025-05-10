import { Component } from '@angular/core';

@Component({
  selector: 'app-services-publishing-house',
  templateUrl: './services-publishing-house.component.html',
  styleUrls: ['./services-publishing-house.component.css']
})
export class ServicesPublishingHouseComponent {
services = [
    {
      name: 'تصميم الأغلفة',
      image: 'assets/images/book2.jpg',
      description: 'نبتكر أغلفة كتب جذابة تعبر عن محتوى الكتاب وتلفت انتباه القرّاء.'
    },
    {
      name: 'تحرير ومراجعة',
      image: 'assets/images/book3.jpg',
      description: 'نوفر خدمات التحرير والمراجعة لضمان جودة المحتوى وخلوه من الأخطاء.'
    },
    {
      name: 'التوزيع والتسويق',
      image: 'assets/images/book1.jpg',
      description: 'نساعدك في نشر كتابك وتوزيعه محليًا وعالميًا للوصول إلى جمهور أوسع.'
    }
  ];
}
