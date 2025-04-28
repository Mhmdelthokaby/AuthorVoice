import { Component } from '@angular/core';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent {
  books = [
    { cover: 'assets/images/book1.jpg', title: 'رواية البداية', description: 'مغامرة شيقة في عالم الخيال.' },
    { cover: 'assets/images/book2.jpg', title: 'رحلة النور', description: 'رواية عن الأمل والانتصار.' },
    { cover: 'assets/images/book3.jpg', title: 'أضواء في الظلام', description: 'بحث في قضايا الإنسان والمجتمع.' },
    { cover: 'assets/images/book2.jpg', title: 'عبر البحار', description: 'رحلة عبر الزمان والمكان.' },
    { cover: 'assets/images/book1.jpg', title: 'أطياف الماضي', description: 'قصص مأساوية مع لمحات من الأمل.' },
    { cover: 'assets/images/book3.jpg', title: 'فجر جديد', description: 'قصة عن التغيير والنمو الشخصي.' }
  ];
}
