import { Component, OnInit } from '@angular/core';
import { AuthorService, UpdateAuthorPayload } from '../../Services/author.service';
import { Url } from '../../url';

@Component({
  selector: 'app-author-about-me',
  templateUrl: './author-about-me.component.html',
  styleUrls: ['./author-about-me.component.css']
})
export class AuthorAboutMeComponent implements OnInit {

  authorId: number = 0;
  authorData: UpdateAuthorPayload | null = null;
  image1Url: string = '';
  image2Url: string = '';

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      this.authorId = +storedId;
      this.loadAuthorData();
    } else {
      console.error('No authorId found in localStorage');
    }
  }

  loadAuthorData(): void {
    this.authorService.getAuthor(this.authorId).subscribe(
      data => {
        this.authorData = data;

        this.image1Url = data.image1?.startsWith('http')
          ? data.image1
          : `${Url}${data.image1}`;

        this.image2Url = data.image2?.startsWith('http')
          ? data.image2
          : `${Url}${data.image2}`;

      },
      error => {
        console.error('Failed to load author data', error);
      }
    );
  }
}
