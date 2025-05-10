import { Component } from '@angular/core';

@Component({
  selector: 'app-departments-publishing-house',
  templateUrl: './departments-publishing-house.component.html',
  styleUrls: ['./departments-publishing-house.component.css']
})
export class DepartmentsPublishingHouseComponent {
categories = [
    {
      name: 'الأدب والشعر',
      image: 'assets/images/book1.jpg',
      description: 'نقدم أروع الأعمال الأدبية والشعرية التي تمس القلب وتثير الفكر.'
    },
    {
      name: 'كتب الأطفال',
      image: 'assets/images/book2.jpg',
      description: 'عالم مليء بالحكايات والرسوم التي تنمي الخيال وتعلم القيم.'
    },
    {
      name: 'التنمية الذاتية',
      image: 'assets/images/book3.jpg',
      description: 'مجموعة كتب تساعدك على تطوير ذاتك وتحقيق أهدافك الشخصية والمهنية.'
    }
  ];
}
