import { Component } from '@angular/core';
import { PublishingService } from '../../../../Services/publishing-house.service';

@Component({
  selector: 'app-publish-main-form',
  templateUrl: './publish-main-form.component.html',
  styleUrls: ['./publish-main-form.component.css']
})
export class PublishMainFormComponent {
  UserId: number;

  publisher = { Name: '', AboutUs: '', Subtitle: '' };
  book = { title: '', coverImage: '', description: '' };
  category = { name: '', image: '' };
  service = { name: '', description: '', image: '' };
  goal = { text: '' };
  connect = { text: '' };
  join = { text: '' };

  isSavingPublisher = false;
  isSavingBooks = false;
  isSavingCategories = false;
  isSavingServices = false;
  isSavingGoals = false;
  isSavingConnect = false;
  isSavingJoin = false;

  constructor(private publishingService: PublishingService) {
    const storedUserId = localStorage.getItem('userId');
    this.UserId = storedUserId ? +storedUserId : 0;
  }

  onSubmitPublisher() {
    this.isSavingPublisher = true;
    this.publishingService.updatePublishingText(this.UserId, this.publisher).subscribe({
      next: () => {
        alert('تم حفظ بيانات دار النشر بنجاح');
        this.isSavingPublisher = false;
      },
      error: () => {
        alert('حدث خطأ أثناء حفظ بيانات دار النشر');
        this.isSavingPublisher = false;
      }
    });
  }

  onSubmitBooks() {
    this.isSavingBooks = true;
    this.publishingService.updateBookText(this.UserId, this.book).subscribe({
      next: () => {
        alert('تم حفظ الكتاب بنجاح');
        this.isSavingBooks = false;
      },
      error: () => {
        alert('حدث خطأ أثناء حفظ الكتاب');
        this.isSavingBooks = false;
      }
    });
  }

  onSubmitCategories() {
    this.isSavingCategories = true;
    this.publishingService.updateCategoryText(this.UserId, this.category).subscribe({
      next: () => {
        alert('تم حفظ الفئة بنجاح');
        this.isSavingCategories = false;
      },
      error: () => {
        alert('حدث خطأ أثناء حفظ الفئة');
        this.isSavingCategories = false;
      }
    });
  }

  onSubmitServices() {
    this.isSavingServices = true;
    this.publishingService.updateServiceText(this.UserId, this.service).subscribe({
      next: () => {
        alert('تم حفظ الخدمة بنجاح');
        this.isSavingServices = false;
      },
      error: () => {
        alert('حدث خطأ أثناء حفظ الخدمة');
        this.isSavingServices = false;
      }
    });
  }

  onSubmitGoals() {
    this.isSavingGoals = true;
    this.publishingService.updateGoalText(this.UserId, this.goal).subscribe({
      next: () => {
        alert('تم حفظ الأهداف بنجاح');
        this.isSavingGoals = false;
      },
      error: () => {
        alert('حدث خطأ أثناء حفظ الأهداف');
        this.isSavingGoals = false;
      }
    });
  }

  onSubmitConnect() {
    this.isSavingConnect = true;
    this.publishingService.updateConnectText(this.UserId, this.connect).subscribe({
      next: () => {
        alert('تم حفظ التواصل بنجاح');
        this.isSavingConnect = false;
      },
      error: () => {
        alert('حدث خطأ أثناء حفظ التواصل');
        this.isSavingConnect = false;
      }
    });
  }

  onSubmitJoin() {
    this.isSavingJoin = true;
    this.publishingService.updateJoinText(this.UserId, this.join).subscribe({
      next: () => {
        alert('تم حفظ الانضمام بنجاح');
        this.isSavingJoin = false;
      },
      error: () => {
        alert('حدث خطأ أثناء حفظ الانضمام');
        this.isSavingJoin = false;
      }
    });
  }
}
