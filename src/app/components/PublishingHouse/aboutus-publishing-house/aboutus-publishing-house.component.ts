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
interface Goal {
  Id: number;
  text: string;
}

@Component({
  selector: 'app-aboutus-publishing-house',
  templateUrl: './aboutus-publishing-house.component.html',
  styleUrls: ['./aboutus-publishing-house.component.css']
})
export class AboutusPublishingHouseComponent  implements OnInit
{
  publishingHouseId: number = 0;
  
    publishingHouse: Publishing_House = {
      name: '',
      logo: null,
      aboutUsLogo: null,
      subtitle: '',
      aboutUs: ''
    };
   goals: Goal[] = [];

  
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
        this.publishingHouse.aboutUsLogo = `${Url}${this.publishingHouse.aboutUsLogo}`

         if (data.goals) {
        this.goals = data.goals;
      }

      },
      error: (error) => {
        console.error('Failed to load publishing house data:', error);
      }
    });
  }
}
