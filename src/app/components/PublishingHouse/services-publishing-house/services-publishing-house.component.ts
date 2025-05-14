import { Component, OnInit } from '@angular/core';
import { PublishingService } from '../../../Services/publishing-house.service';
import { Url } from '../../../url';
 

// Interfaces matching the API structure
interface Publishing_House {
  name: string;
  logo: string | null;
  aboutUsLogo: string | null;
  subtitle: string;
  aboutUs: string;
}
interface Service {
  Id: number;
  name: string;
  description: string;
  image?: string | File;
}

@Component({
  selector: 'app-services-publishing-house',
  templateUrl: './services-publishing-house.component.html',
  styleUrls: ['./services-publishing-house.component.css']
})
export class ServicesPublishingHouseComponent implements OnInit {


  publishingHouseId: number = 0;
  
    publishingHouse: Publishing_House = {
      name: '',
      logo: null,
      aboutUsLogo: null,
      subtitle: '',
      aboutUs: ''
    };

services : Service[] = [];

constructor(
        private publishingService: PublishingService
      ) { }

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

      
      },
      error: (error) => {
        console.error('Failed to load publishing house data:', error);
      }
    });
  }
    
}
