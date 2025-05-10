import { Component } from '@angular/core';
import { AuthorService, UpdateAuthorPayload } from '../../Services/author.service';
import { Url } from '../../url'


@Component({
  selector: 'app-author-hero-section',
  templateUrl: './author-hero-section.component.html',
  styleUrls: ['./author-hero-section.component.css']
})
export class AuthorHeroSectionComponent {
  authorData: UpdateAuthorPayload | null = null;
  image1Url: string = '';
  authorId: number = 0;

  constructor(private authorService: AuthorService) {}

   ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      this.authorId = +storedId;
      this.loadAuthorData();
    } else {
      console.error('Author ID not found in localStorage');
    }
  }

  loadAuthorData(): void {
    this.authorService.getAuthor(this.authorId).subscribe({
      next: (data) => {
        this.authorData = data;
        // Adjust this line depending on how image1 is returned
        this.image1Url = data.image1?.startsWith('http') ? data.image1 : `${Url}${data.image1}`;
      },
      error: (err) => {
        console.error('Error loading author data', err);
      }
    });
  }
}
