import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService, BookForm } from '../../Services/author.service';
import { AuthService } from '../../Services/AuthService';
import { Book, BookUpdate } from '../../types/book';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {
  authorId!: number;
  books: Book[] = [];
  loading = false;
  errorMessage = '';
  newBookFile: File | null = null;
  selectedBook: Book | null = null;

  newBook: BookForm = {
    name: '',
    description: '',
    link: '',
    imageFile: null
  };

  constructor(
    private authorService: AuthorService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeAuthorId();
    if (!this.errorMessage) {
      this.fetchBooks();
    }
  }

  private initializeAuthorId(): void {
    const idParam = this.route.snapshot.paramMap.get('authorId');
    if (idParam && !isNaN(+idParam)) {
      this.authorId = +idParam;
    } else {
      const storedUserId = this.authService.getUserId();
      if (storedUserId && !isNaN(+storedUserId)) {
        this.authorId = +storedUserId;
      } else {
        this.errorMessage = 'لم يتم العثور على معرف المؤلف';
      }
    }
  }

  private setLoading(state: boolean, message: string = ''): void {
    this.loading = state;
    this.errorMessage = message;
  }

  private fetchBooks(): void {
    this.setLoading(true);
    this.authorService.getAuthorBooks(this.authorId).subscribe({
      next: (books) => {
        this.books = books.map(book => ({
          ...book,
          imageFile: null // Initialize imageFile
        }));
        this.setLoading(false);
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.setLoading(false, 'فشل تحميل الكتب');
      }
    });
  }

  onNewBookFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateFile(file)) {
        this.newBookFile = file;
        this.newBook.imageFile = file;
      } else {
        this.newBookFile = null;
        this.newBook.imageFile = null;
      }
    } else {
      this.newBookFile = null;
      this.newBook.imageFile = null;
    }
  }

  addBook(): void {
    if (!this.newBook.imageFile) {
      this.errorMessage = 'يرجى اختيار صورة للكتاب';
      return;
    }

    this.setLoading(true);
    this.authorService.addBook(this.authorId, this.newBook).subscribe({
      next: (res) => {
        console.log('Book added:', res);
        this.resetNewBook();
        this.fetchBooks();
        this.setLoading(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error adding book:', err);
        this.setLoading(false);
        this.errorMessage = err.error?.message || 'فشل إضافة الكتاب';
      }
    });
  }

  updateBook(book: Book): void {
    if (!book.id) {
      this.errorMessage = 'معرف الكتاب غير صالح';
      return;
    }

    this.selectedBook = book;
    if (!this.selectedBook) {
      this.errorMessage = 'لم يتم اختيار الكتاب';
      return;
    }

    const formData = new FormData();
    formData.append('Id', String(this.selectedBook.id));
    formData.append('Name', this.selectedBook.name || '');
    formData.append('Description', this.selectedBook.description || '');
    if (this.selectedBook.link) {
      formData.append('Link', this.selectedBook.link);
    }
    if (this.selectedBook.imageFile) {
      formData.append('ImageFile', this.selectedBook.imageFile, this.selectedBook.imageFile.name);
    }

    this.setLoading(true);
    this.authorService.updateBook(book.id, formData).subscribe({
      next: (res) => {
        this.setLoading(false);
        console.log('Book updated:', res);
        const idx = this.books.findIndex(b => b.id === book.id);
        if (idx !== -1) {
          this.books[idx] = {
            ...book,
            image: res.Image || book.image, // Match backend response
            imageFile: null // Reset after update
          };
        }
        this.errorMessage = '';
      },
      error: (err: HttpErrorResponse) => {
        this.setLoading(false);
        this.errorMessage = err.error?.message || 'فشل تحديث الكتاب';
        console.error('Error updating book:', err);
      }
    });
  }

  onImageSelected(event: Event, book: Book): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateFile(file)) {
        book.imageFile = file;
      } else {
        book.imageFile = null;
      }
    } else {
      book.imageFile = null;
    }
  }

  deleteBook(bookId: number): void {
    if (!confirm('هل أنت متأكد أنك تريد حذف هذا الكتاب؟')) return;

    this.setLoading(true);
    console.log(bookId);
    
    this.authorService.deleteBook(bookId).subscribe({
      next: () => {
        this.books = this.books.filter(b => b.id !== bookId);
        this.setLoading(false);
      },
      error: (err) => {
        console.error('Error deleting book:', err);
        this.setLoading(false, 'فشل حذف الكتاب');
      }
    });
  }

  private validateFile(file: File): boolean {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'فقط الصور بصيغة JPEG أو PNG أو GIF مسموحة';
      return false;
    }

    if (file.size > maxSize) {
      this.errorMessage = 'يجب ألا يتجاوز حجم الصورة 5 ميغابايت';
      return false;
    }

    return true;
  }

  private resetNewBook(): void {
    this.newBook = {
      name: '',
      description: '',
      link: '',
      imageFile: null
    };
    this.newBookFile = null;
  }

  trackByBookId(index: number, book: Book): number {
    return book.id;
  }

  onBookSelect(book: Book): void {
    this.selectedBook = { ...book };
  }
}