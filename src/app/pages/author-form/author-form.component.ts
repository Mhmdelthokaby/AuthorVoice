import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service'; // Adjust the path as necessary
import { AuthorService } from 'src/app/Services/author.service';


// author-form.component.ts
@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {
  profile: any = {
    name: '',
    phone: '',
    email: '',
    address: '',
    age: null,
    birthday: '',
    nationality: '',
    subtitle: '',
    image1: '',
    image2: '',
    description1: '',
    description2: '',
    experience: '',
    skills: '',
    specialization: '',
  };

  constructor(private authService: AuthService, private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  async loadProfile() {
    const user = await this.authService.getUser();
    if (user && user.profile) {
      this.profile = { ...this.profile, ...user.profile }; // Pre-fill the form with existing data
    }
  }

  // Handles image file upload
  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile[fieldName] = e.target.result; // Store the file URL or base64 string
      };
      reader.readAsDataURL(file); // Convert the image to a base64 string
    }
  }

 // author-form.component.ts
async onSubmit() {
  try {
    const result = await this.authorService.updateProfile(this.profile);
    console.log('updateProfile result', result);
    alert('Profile updated successfully!');
  } catch (err: any) {
    console.error('updateProfile threw', err);
    alert(`Update failed: ${err.message}`);
  }
}

}

