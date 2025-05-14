import { Component, OnInit } from '@angular/core';
import { PublishingService } from '../../../../Services/publishing-house.service';
import { AuthService } from '../../../../Services/AuthService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

// Interfaces matching the API structure
interface Publishing_House {
  name: string;
  logo: string | null;
  aboutUsLogo: string | null;
  subtitle: string;
  aboutUs: string;
}
 

interface Book {
  Id: number;
  title: string;
  author: string;
  description: string;
  publishingDate?: string;
  coverImgae?: string | File;
}

interface Category {
  Id: number;
  name: string;
  description: string;
  image?: string | File;
}

interface Service {
  Id: number;
  name: string;
  description: string;
  image?: string | File;
}

interface Goal {
  Id: number;
  text: string;
}

interface Connect {
  Id: number;
  title: string;
  description: string;
}

interface Join {
  Id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-publish-main-form',
  templateUrl: './publish-main-form.component.html',
  styleUrls: ['./publish-main-form.component.css']
})
export class PublishMainFormComponent implements OnInit {
  publishingHouseId: number = 0;

  publishingHouse: Publishing_House = {
    name: '',
    logo: null,
    aboutUsLogo: null,
    subtitle: '',
    aboutUs: ''
  };

  books: Book[] = [];
  categories: Category[] = [];
  services: Service[] = [];
  goals: Goal[] = [];
  connects: Connect[] = [];
  joins: Join[] = [];



  constructor(
    private publishingService: PublishingService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    this.publishingHouseId = storedId ? +storedId : 0;


    if (this.publishingHouseId) {
      this.loadPublishData();
    }
  }

  successMessage: string | null = null;
  errorMessage: string | null = null;

  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 5000); // 5 seconds
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); // 5 seconds
  }


  loadPublishData(): void {
    this.publishingService.getPublishingHouse(this.publishingHouseId).subscribe({
      next: (data) => {
        this.publishingHouse = data;
      },
      error: (error) => {
        console.error('Failed to load publishing house data:', error);
      }
    });
  }

  updatePublishingHouse(): void {
    this.successMessage = null;
    this.errorMessage = null;

    this.publishingService.updatePublishingText(this.publishingHouseId, {
      Name: this.publishingHouse.name,
      Subtitle: this.publishingHouse.subtitle,
      AboutUs: this.publishingHouse.aboutUs
    }).subscribe({
      next: () => {
        this.showSuccess('Publishing house updated successfully.');
      },
      error: (err) => {
        this.showError('Failed to update publishing house.');
        console.error(err);
      }
    });
  }

  // New Book

  newBook = {
    title: '',
    author: '',
    description: '',
    coverImgae: null as File | null
  };

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newBook.coverImgae = file;
    }
  }

  submitNewBook(): void {
    this.successMessage = null;
    this.errorMessage = null;

    this.publishingService.addBook(this.publishingHouseId, this.newBook).subscribe({
      next: (book) => {
        this.books.push(book);
        this.successMessage = 'تمت إضافة الكتاب بنجاح';
        this.newBook = { title: '', author: '', description: '', coverImgae: null };
      },
      error: (err) => {
        console.error('فشل في إضافة الكتاب:', err);
        this.errorMessage = 'فشل في إضافة الكتاب';
      }
    });
  }

  // New Category 

  newCategory = {
    name: '',
    description: '',
    image: null as File | null
  };
  onCategoryImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newCategory.image = file;
    }
  }

  submitNewCategory(): void {
    this.successMessage = null;
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('Name', this.newCategory.name);
    formData.append('Description', this.newCategory.description);
    if (this.newCategory.image) {
      formData.append('Image', this.newCategory.image);
    }

    this.publishingService.addCategory(this.publishingHouseId, formData).subscribe({
      next: (category) => {
        this.categories.push(category);
        this.showSuccess('تمت إضافة التصنيف بنجاح');
        this.newCategory = { name: '', description: '', image: null };
      },
      error: (err) => {
        console.error('فشل في إضافة التصنيف:', err);
        this.showError('فشل في إضافة التصنيف');
      }
    });
  }
  //add Contact
  newConnect = {
    title: '',
    description: '',
    image: null as File | null
  };

  onConnectImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newConnect.image = file;
    }
  }

  submitNewConnect(): void {
    const formData = new FormData();
    formData.append('Title', this.newConnect.title);
    formData.append('Decription', this.newConnect.description); // note: matches your backend spelling
    if (this.newConnect.image) {
      formData.append('Image', this.newConnect.image);
    }

    this.publishingService.addConnect(this.publishingHouseId, formData).subscribe({
      next: () => {
        this.showSuccess('تمت إضافة وسيلة التواصل بنجاح');
        this.newConnect = { title: '', description: '', image: null };
      },
      error: (err) => {
        console.error('فشل في إضافة وسيلة التواصل:', err);
        this.showError('فشل في إضافة وسيلة التواصل');
      }
    });
  }

  // join 


  newJoin = {
    title: '',
    description: ''
  };

  submitNewJoin(): void {
    const formData = new FormData();
    formData.append('Title', this.newJoin.title);
    formData.append('Description', this.newJoin.description);

    this.publishingService.addJoin(this.publishingHouseId, formData).subscribe({
      next: () => {
        this.showSuccess('تمت إضافة طريقة الانضمام بنجاح');
        this.joins.push({
          Id: Math.random(), // Replace with real Id if returned from backend
          title: this.newJoin.title,
          description: this.newJoin.description
        });
        this.newJoin = { title: '', description: '' };
      },
      error: (err) => {
        console.error('فشل في إضافة طريقة الانضمام:', err);
        this.showError('فشل في إضافة طريقة الانضمام');
      }
    });
  }


  //Add Goals

  newGoal = {
  text: ''
};

submitNewGoal(): void {
  const formData = new FormData();
  formData.append('Text', this.newGoal.text);

  this.publishingService.addGoal(this.publishingHouseId, formData).subscribe({
    next: () => {
      this.showSuccess('تمت إضافة الهدف بنجاح');
      this.goals.push({
        Id: Math.random(), // Replace with actual ID from backend if returned
        text: this.newGoal.text
      });
      this.newGoal.text = '';
    },
    error: (err) => {
      console.error('فشل في إضافة الهدف:', err);
      this.showError('فشل في إضافة الهدف');
    }
  });
}

// Add Services 
newService = {
  name: '',
  description: '',
  image: null as File | null
};

onServiceFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.newService.image = file;
  }
}

submitNewService(): void {
  const formData = new FormData();
  formData.append('Name', this.newService.name);
  formData.append('Description', this.newService.description);
  if (this.newService.image) {
    formData.append('Image', this.newService.image);
  }

  this.publishingService.addService(this.publishingHouseId, formData).subscribe({
    next: () => {
      this.showSuccess('تمت إضافة الخدمة بنجاح');
      this.services.push({
        Id: Math.random(), // replace with actual ID from backend if available
        name: this.newService.name,
        description: this.newService.description,
        image: '' // update if backend returns it
      });
      this.newService = { name: '', description: '', image: null };
    },
    error: (err) => {
      console.error('فشل في إضافة الخدمة:', err);
      this.showError('فشل في إضافة الخدمة');
    }
  });
}

selectedImages: { [key: string]: File | null } = {
  image1: null,
  image2: null
};

onImageSelected(event: Event, slot: 'image1' | 'image2'): void {
  const target = event.target as HTMLInputElement;
  const file = target.files && target.files[0];
  if (file) {
    this.selectedImages[slot] = file;
  }
}

submitImageUpdate(): void {
  this.successMessage = null;
  this.errorMessage = null;

  (['image1', 'image2'] as const).forEach(slot => {
    const imageFile = this.selectedImages[slot];
    if (imageFile) {
      this.publishingService.updatePublishingImages(this.publishingHouseId, imageFile, slot).subscribe({
        next: () => {
          this.showSuccess(`تم تحديث ${slot === 'image1' ? 'الشعار' : 'صورة من نحن'} بنجاح`);
          this.selectedImages[slot] = null;
        },
        error: (err) => {
          this.showError(`فشل في تحديث ${slot === 'image1' ? 'الشعار' : 'صورة من نحن'}`);
          console.error(err);
        }
      });
    }
  });
}


}
