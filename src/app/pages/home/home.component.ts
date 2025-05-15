import { Component ,OnInit} from '@angular/core';
import { Url } from '../../url';
import { AuthorService } from '../../Services/author.service';
import { PublishingService } from '../../Services/publishing-house.service'


interface Author {
  id: number;
  userId: number;
  name: string;
  about: string;
  email: string;
  phone: string;
  image1: string;
}

interface PublishingHouses {
  id: number;
  userId: number;
  name: string;
  subtitle: string;
  logo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Url = Url;
  authors: Author[] = [];

  publishingHouses: PublishingHouses[] = [];

  constructor(private authorService: AuthorService, private publishingService: PublishingService) { }

  ngOnInit(): void {
    this.loadAuthors();
    this.loadPublisher(); // ← استدعاء لتحميل دور النشر
  }

loadPublisher(): void {
  this.publishingService.GetAllPublishing().subscribe({
    next: (data) => {
      this.publishingHouses = data;
    },
    error: (err) => {
      console.error('فشل في تحميل دور النشر:', err);
    }
  });
}


  loadAuthors(): void {
    this.authorService.getAllAuthor().subscribe({
      next: (data) => {
        this.authors = data;
        
      },
      error: (err) => {
        console.error('فشل في تحميل المؤلفين:', err);
      }
    });
  }


}
