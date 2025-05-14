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
 

@Component({
  selector: 'app-hero-publishing-house',
  templateUrl: './hero-publishing-house.component.html',
  styleUrls: ['./hero-publishing-house.component.css']
})
export class HeroPublishingHouseComponent implements OnInit {

  publishingHouseId: number = 0;

  publishingHouse: Publishing_House = {
    name: '',
    logo: null,
    aboutUsLogo: null,
    subtitle: '',
    aboutUs: ''
  };

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
        this.publishingHouse.logo = `${Url}${this.publishingHouse.logo}`
        
      },
      error: (error) => {
        console.error('Failed to load publishing house data:', error);
      }
    });
  }
  bgImg = "assets/images/Publishing-House-hero.jpg";  // Corrected assignment

}
