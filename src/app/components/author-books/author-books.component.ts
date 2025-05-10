import { Component, OnInit } from '@angular/core';
import { AuthorService, Book } from '../../Services/author.service';
import { Url } from '../../url'; // Make sure this is your base API or image URL

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent implements OnInit {

  authorId: number = 0;
  books: Book[] = [];

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      this.authorId = +storedId;
      this.loadBooks();
    } else {
      console.error('No authorId found in localStorage');
    }
  }

  loadBooks(): void {
    this.authorService.getAuthorBooks(this.authorId).subscribe(
      data => {
        this.books = data.map(book => ({
          ...book,
          cover: book.image?.startsWith('http') ? book.image : `${Url}${book.image}`,
          title: book.name
        }));
        console.log('Loaded books:', this.books);
      },
      error => {
        console.error('Failed to load books', error);
      }
    );
  }
}
