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

interface Category {
  Id: number;
  name: string;
  description: string;
  image?: string | File;
}

@Component({
  selector: 'app-departments-publishing-house',
  templateUrl: './departments-publishing-house.component.html',
  styleUrls: ['./departments-publishing-house.component.css']
})
export class DepartmentsPublishingHouseComponent implements OnInit{


  publishingHouseId: number = 0;
  
    publishingHouse: Publishing_House = {
      name: '',
      logo: null,
      aboutUsLogo: null,
      subtitle: '',
      aboutUs: ''
    };

categories : Category[] = [];
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

         if (data.categories) {
        this.categories = data.categories;
        this.categories.forEach(c =>{
          if(typeof c.image === 'string'){
            c.image = `${Url}${c.image}`
          }
        })
      }

      },
      error: (error) => {
        console.error('Failed to load publishing house data:', error);
      }
    });
  }

}
