import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus-publishing-house',
  templateUrl: './aboutus-publishing-house.component.html',
  styleUrls: ['./aboutus-publishing-house.component.css']
})
export class AboutusPublishingHouseComponent {
  aboutUsImage = "assets/images/aboutUsPh.jpg"
goals: string[] = [
    'دعم المواهب الأدبية والكتّاب الجدد ومنحهم منصة للنشر',
    'نشر كتب ذات قيمة معرفية وفكرية تثري المجتمع',
    'تعزيز ثقافة القراءة ونشر الوعي بأهمية الكتاب في الحياة اليومية',
    'المساهمة في بناء جيل قارئ ومثقف ومبدع',
    'تحقيق التميز في جودة النشر والإخراج الفني للكتب'
  ];
}
