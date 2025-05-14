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
interface Connect {
  Id: number;
  title: string;
  decription: string;
  image : string ;
}

@Component({
  selector: 'app-how-to-connect-publishing-house',
  templateUrl: './how-to-connect-publishing-house.component.html',
  styleUrls: ['./how-to-connect-publishing-house.component.css']
})
export class HowToConnectPublishingHouseComponent implements OnInit{
  publishingHouseId: number = 0;
  
    publishingHouse: Publishing_House = {
      name: '',
      logo: null,
      aboutUsLogo: null,
      subtitle: '',
      aboutUs: ''
    };

  contacts :Connect[]= [];
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

         if (data.howToConnects) {
        this.contacts = data.howToConnects;
        this.contacts.forEach(c =>{
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
