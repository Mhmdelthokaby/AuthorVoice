import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService , UpdateAuthorPayload ,Book } from '../../../Services/author.service'
import { Url } from '../../../url'


@Component({
  selector: 'app-admin-author-view',
  templateUrl: './admin-author-view.component.html',
  styleUrls: ['./admin-author-view.component.css']
})

export class AdminAuthorViewComponent implements OnInit {
  authorId: number | null = null;
  authorData: UpdateAuthorPayload | null = null;
  image1Url: string = '';
  image2Url: string = '';
  books: Book[] = [];

  constructor(private route: ActivatedRoute, private authorService: AuthorService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    this.authorId = !isNaN(id) && id > 0 ? id : null;

    console.log('Author ID:', this.authorId);

    if (this.authorId !== null) {
      this.loadAuthorData();
    }
  }

  loadAuthorData(): void {
    if (this.authorId === null) return;

    this.authorService.getAuthor(this.authorId).subscribe({
      
      next: (data) => {
        this.authorData = data;
        this.image1Url = data.image1?.startsWith('http') ? data.image1 : `${Url}${data.image1}`;
        this.image2Url = data.image2?.startsWith('http')
          ? data.image2
          : `${Url}${data.image2}`;
      },
      error: (err) => {
        console.error('Error loading author data', err);
      }
    });
    this.authorService.getAuthorBooks(this.authorId).subscribe(
      data => {
        this.books = data.map(book => ({
          ...book,
          cover: `${Url}${book.image}`,
          title: book.name
        }));
        console.log('Loaded books:', `${Url}/${this.books}`);
      },
      error => {
        console.error('Failed to load books', error);
      }
    );
  }
}
