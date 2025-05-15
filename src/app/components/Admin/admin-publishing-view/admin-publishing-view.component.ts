import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Url } from '../../../url';
import { PublishingService } from '../../../Services/publishing-house.service';

// Interface for publishing house
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
interface Service {
  Id: number;
  name: string;
  description: string;
  image?: string | File;
}

interface Category {
  Id: number;
  name: string;
  description: string;
  image?: string | File;
}
interface Connect {
  Id: number;
  title: string;
  decription: string;
  image : string ;
}

@Component({
  selector: 'app-admin-publishing-view',
  templateUrl: './admin-publishing-view.component.html',
  styleUrls: ['./admin-publishing-view.component.css']
})
export class AdminPublishingViewComponent implements OnInit {
  publishingHouseId: number | null = null;

  publishingHouse: Publishing_House = {
    name: '',
    logo: null,
    aboutUsLogo: null,
    subtitle: '',
    aboutUs: ''
  };
  goals: Goal[] = [];
  services: Service[] = [];
  categories: Category[] = [];
  contacts :Connect[]= [];


  logoUrl: string = '';
  aboutUsLogoUrl: string = '';
  bgImg = 'assets/images/Publishing-House-hero.jpg';

  constructor(
    private route: ActivatedRoute,
    private publishingService: PublishingService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    this.publishingHouseId = !isNaN(id) && id > 0 ? id : null;

    console.log('Publishing House ID:', this.publishingHouseId);

    if (this.publishingHouseId !== null) {
      this.loadPublishData();
    }
  }

  loadPublishData(): void {
    this.publishingService.getPublishingHouse(this.publishingHouseId!).subscribe({
      next: (data) => {
        this.publishingHouse = data;

        this.publishingHouse.logo = `${Url}${this.publishingHouse.logo}`
        this.publishingHouse.aboutUsLogo = `${Url}${this.publishingHouse.aboutUsLogo}`

        if (data.goals) {
          this.goals = data.goals;
        }
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
          this.categories.forEach(c => {
            if (typeof c.image === 'string') {
              c.image = `${Url}${c.image}`
            }
          })
        }
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
