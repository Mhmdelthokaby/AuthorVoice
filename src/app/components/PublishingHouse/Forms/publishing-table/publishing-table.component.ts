import { Component, OnInit } from '@angular/core';
import { PublishingService } from '../../../../Services/publishing-house.service'
import { Url } from '../../../../url';



// Interfaces matching the API structure
interface Publishing_House {
  name: string;
  logo: string | null;
  aboutUsLogo: string | null;
  subtitle: string;
  aboutUs: string;
}


interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  publishingDate?: string;
  coverImgae?: string | File;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image?: string | File;
}

interface Service {
  id: number;
  name: string;
  description: string;
  image?: string | File;
}

interface Goal {
  id: number;
  text: string;
}

interface Connect {
  id: number;
  title: string;
  decription: string;
  image: string;
}

interface Join {
  id: number;
  title: string;
  decription: string;
}


@Component({
  selector: 'app-publishing-table',
  templateUrl: './publishing-table.component.html',
  styleUrls: ['./publishing-table.component.css']
})
export class PublishingTableComponent implements OnInit {

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

  constructor(private publishingService: PublishingService) { }
  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    this.publishingHouseId = storedId ? +storedId : 0;


    if (this.publishingHouseId) {
      this.loadPublishData();
    }
  }


  loadPublishData(): void {
    this.publishingService.getPublishingHouse(this.publishingHouseId).subscribe({
      next: (data) => {
        this.publishingHouse = data;

        if (data.services) {
                this.services = data.services;
                this.services.forEach(service => {
                  if (typeof service.image === 'string') {
                    service.image = `${Url}${service.image}`;
                  }
                });
              }
              if (data.categories) {
                this.categories = data.categories;
                this.categories.forEach(service => {
                  if (typeof service.image === 'string') {
                    service.image = `${Url}${service.image}`;
                  }
                });
              }
              if (data.howToConnects) {
                this.connects = data.howToConnects;
                this.connects.forEach(service => {
                  if (typeof service.image === 'string') {
                    service.image = `${Url}${service.image}`;
                  }
                });
              }
        if (data.goals) {
                this.goals = data.goals;
                
              }

      },
      error: (error) => {
        console.error('Failed to load publishing house data:', error);
      }
    });
  }

  deleteService(id: number): void {
  if (!this.publishingHouseId) {
    console.error('Publishing House ID is missing.');
    return;
  }

  this.publishingService.deleteService(this.publishingHouseId, id).subscribe({
    next: () => {
      this.services = this.services.filter(service => service.id !== id);
    },
    error: (err) => {
      console.error('Error deleting service:', err);
    }
  });
}

isString(value: any): value is string {
  return typeof value === 'string';
}

// 

deleteGoal(id: number): void {
  if (!this.publishingHouseId) {
    console.error('Publishing House ID is missing.');
    return;
  }

  this.publishingService.deleteGoal(this.publishingHouseId, id).subscribe({
    next: () => {
      this.goals = this.goals.filter(goal => goal.id !== id);
    },
    error: err => {
      console.error('Error deleting goal:', err);
    }
  });
}
// 
deleteCategory(id: number): void {
  if (!this.publishingHouseId) {
    console.error('Publishing House ID is missing.');
    return;
  }

  this.publishingService.deleteCategory(this.publishingHouseId, id).subscribe({
    next: () => {
      this.categories = this.categories.filter(category => category.id !== id);
    },
    error: err => {
      console.error('Error deleting category:', err);
    }
  });
}
deleteConnect(id: number): void {
  if (!this.publishingHouseId) {
    console.error('Publishing House ID is missing.');
    return;
  }

  this.publishingService.deleteConnect(this.publishingHouseId, id).subscribe({
    next: () => {
      this.connects = this.connects.filter(connect => connect.id !== id);
    },
    error: err => {
      console.error('Error deleting connect info:', err);
    }
  });
}


}
