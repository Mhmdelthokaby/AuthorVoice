import { Component, OnInit } from '@angular/core';
import { AuthorService, UpdateAuthorPayload } from '../../Services/author.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Profile {
  name: string;
  phone: string;
  email: string;
  address: string;
  age: number | null;
  birthday: string; // format: 'YYYY-MM-DD'
  nationality: string;
  image1: string | null; // image path or URL
  image2: string | null;
  description1: string;
  description2: string;
  experience: string;
  skills: string;
  subtitle: string;
  specialization: string;
}

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css'],
})
export class AuthorFormComponent implements OnInit {
  profile: Profile = {
    name: '',
    phone: '',
    email: '',
    address: '',
    age: null,
    birthday: '',
    nationality: '',
    image1: null,
    image2: null,
    description1: '',
    description2: '',
    experience: '',
    skills: '',
    subtitle: '',
    specialization: '',
  };

  isSaving = false;
  isUploading = false;
  errorMessage = '';
  successMessage = '';

  authorId: number;

  image1File: File | null = null;
  image2File: File | null = null;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const storedUserId = localStorage.getItem('userId');
    this.authorId = storedUserId ? +storedUserId : 0;
  }

  ngOnInit(): void {
    if (this.authorId) {
      this.loadAuthorData();
    } else {
      this.errorMessage = 'لا يوجد معرف مستخدم مسجل';
    }
  }

  loadAuthorData(): void {
    this.isSaving = true;
    this.authorService.getAuthor(this.authorId).subscribe(
      (data: Profile) => {
        this.profile = { ...data };
        this.isSaving = false;
      },
      (error) => {
        this.errorMessage = 'خطأ في جلب بيانات المؤلف';
        console.error(error);
        this.isSaving = false;
      }
    );
  }

  onFileChange(event: any, field: 'image1' | 'image2'): void {
    const file = event.target.files[0] as File | undefined;
    if (field === 'image1') {
      this.image1File = file ?? null;
    } else {
      this.image2File = file ?? null;
    }
  }

  uploadImagesIfNeeded(): void {
    if (this.image1File) {
      this.authorService.uploadAuthorImage(this.authorId, this.image1File, 'image1').subscribe(
        () => {
          console.log('تم رفع الصورة ١');
          this.successMessage = 'تم رفع الصورة ١ بنجاح';
        },
        (err) => {
          console.error('خطأ في رفع الصورة ١', err);
          this.errorMessage = 'خطأ في رفع الصورة ١';
        }
      );
    }
    if (this.image2File) {
      this.authorService.uploadAuthorImage(this.authorId, this.image2File, 'image2').subscribe(
        () => {
          console.log('تم رفع الصورة ٢');
          this.successMessage = 'تم رفع الصورة ٢ بنجاح';
        },
        (err) => {
          console.error('خطأ في رفع الصورة ٢', err);
          this.errorMessage = 'خطأ في رفع الصورة ٢';
        }
      );
    }
  }

  onSubmit(): void {
    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const updatePayload: UpdateAuthorPayload = {
      name: this.profile.name,
      phone: this.profile.phone,
      email: this.profile.email,
      address: this.profile.address,
      nationality: this.profile.nationality,
      subtitle: this.profile.subtitle,
      description1: this.profile.description1,
      description2: this.profile.description2,
      experience: this.profile.experience,
      specialization: this.profile.specialization,
      skills: this.profile.skills,
      age: this.profile.age ?? 0,
      birthday: this.profile.birthday,
    };

    this.authorService.updateProfile(this.authorId, updatePayload).subscribe(
      () => {
        this.successMessage = 'تم حفظ البيانات بنجاح';
        this.isSaving = false;
      },
      (err) => {
        this.errorMessage = err.message || 'حدث خطأ في حفظ البيانات';
        this.isSaving = false;
      }
    );
  }

  onUploadImages(): void {
    this.isUploading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.image1File && !this.image2File) {
      this.errorMessage = 'يرجى اختيار صورة واحدة على الأقل';
      this.isUploading = false;
      return;
    }

    this.uploadImagesIfNeeded();
    this.isUploading = false;
  }
}