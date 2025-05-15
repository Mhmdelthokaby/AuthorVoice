import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../../Services/author.service';
import  {PublishingService } from '../../../Services/publishing-house.service'
import { AuthService} from '../../../Services/AuthService'
import { Url } from '../../../url';

interface Author {
  id: number;
  userId:number;
  name: string;
  about: string;
  email: string;
  phone: string;
  image1: string;
}

interface PublishingHouses {
  id: number;
  userId:number;
  name: string;
  subtitle: string;
  logo: string;
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
Url = Url;
  authors: Author[] = [];

  publishingHouses : PublishingHouses[] = [];

  constructor(private authorService: AuthorService ,private authService: AuthService ,private publishingService: PublishingService) {}

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

  deleteAuthor(id: number): void {
  const author = this.authors.find(a => a.id === id);
  if (!author) return;

  const userId = author.userId; // ✅ تعريف المتغير بشكل صحيح

  this.authService.deleteUser(userId).subscribe({
    next: () => {
      this.authors = this.authors.filter(author => author.id !== id);
      console.log('تم حذف المؤلف بنجاح');
    },
    error: (err) => {
      console.error('حدث خطأ أثناء حذف المؤلف:', err);
    }
  });
}


  deletePublishing(id: number): void {
    const publisher = this.publishingHouses.find(a => a.id === id);
  if (!publisher) return;

  const userId = publisher.userId; // ✅ تعريف المتغير بشكل صحيح

  this.authService.deleteUser(userId).subscribe({
    next: () => {
      this.publishingHouses = this.publishingHouses.filter(publisher => publisher.id !== id);
      console.log('تم حذف المؤلف بنجاح');
    },
    error: (err) => {
      console.error('حدث خطأ أثناء حذف المؤلف:', err);
    }
  });
    
  }
}
