import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ApiService } from '../../services/api.service';
import { ThreadsService } from '../../services/threads.service';
import { CommonModule } from '@angular/common';
import { LayoutBarComponent } from '../layout-bar/layout-bar.component';

@Component({
  selector: 'create-thread',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, CommonModule, LayoutBarComponent],
  providers: [ApiService, ThreadsService],

  templateUrl: './create-thread.component.html',
})
export class CreateThreadComponent {
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  api = new ApiService();
  threads = new ThreadsService();

  onBack() {
    this.router.navigate(['threads']);
  }

  async onCreateThread(form: NgForm) {
    const data = {
      name: form.value.name,
    };

    try {
      await this.threads.createThread(data);
      this.router.navigate(['threads']);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unknown error occurred';
      }
    }
  }
}
