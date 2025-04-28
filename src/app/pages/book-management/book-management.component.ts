import { Component, OnInit } from '@angular/core';
import { AuthorBooksService } from '../../Services/author-books.service';
import { AuthService } from '../../Services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {
  newBook = {
    name: '',
    description: '',
    link: '',
    image: '',
  };
  books: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private authorBooksService: AuthorBooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  async loadBooks() {
    this.loading = true;
    try {
      this.books = await this.authorBooksService.getMyBooks();
    } catch (error: any) {
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }

  async addBook() {
    this.loading = true;
    try {
      const user = await this.authService.currentUser.pipe(take(1)).toPromise();
      await this.authorBooksService.createBook({ ...this.newBook, author_id: user?.id });
      this.newBook = { name: '', description: '', link: '', image: '' };
      await this.loadBooks();
    } catch (error: any) {
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }

  async updateBook(book: any) {
    this.loading = true;
    try {
      await this.authorBooksService.updateBook(book.id, book);
      alert('Book updated successfully!');
    } catch (error: any) {
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }

  async deleteBook(bookId: string) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    this.loading = true;
    try {
      await this.authorBooksService.deleteBook(bookId);
      await this.loadBooks();
    } catch (error: any) {
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }


 
    tempBooks = [
      {
        id: 'temp1',
        name: 'رحلة عبر الزمن',
        description: 'كتاب يتحدث عن مغامرات السفر عبر الزمن واستكشاف العصور المختلفة.',
        link: '',
        image: 'assets/images/book1.jpg',
      },
      {
        id: 'temp2',
        name: 'فن الإقناع',
        description: 'دليل عملي لاستخدام أساليب التأثير والإقناع بطريقة فعالة وأخلاقية.',
        link: '',
        image: 'assets/images/book2.jpg',
      },
      {
        id: 'temp3',
        name: 'أسرار العقل البشري',
        description: 'كتاب يكشف خفايا عمل الدماغ وكيفية تحسين الأداء الذهني.',
        link: '',
        image: 'assets/images/book3.jpg',
      },
      {
        id: 'temp4',
        name: 'رحلات حول العالم',
        description: 'قصص حقيقية عن المغامرات والسفر إلى أماكن بعيدة وغريبة.',
        link: '',
        image: 'assets/images/book1.jpg',
      },
      {
        id: 'temp5',
        name: 'أساسيات ريادة الأعمال',
        description: 'دليل شامل لكل من يريد تأسيس مشروعه الخاص من الصفر.',
        link: '',
        image: 'assets/images/book3.jpg',
      },
      {
        id: 'temp6',
        name: 'الذكاء الاصطناعي ومستقبل البشر',
        description: 'نظرة شاملة عن تطور الذكاء الاصطناعي وتأثيره على مستقبل الإنسانية.',
        link: '',
        image: 'assets/images/book2.jpg',
      }
    ];


}
