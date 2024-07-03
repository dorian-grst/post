import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { LayoutBarComponent } from '../layout-bar/layout-bar.component';

@Component({
  selector: 'create-post',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, CommonModule, LayoutBarComponent],
  providers: [PostsService, UsersService],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent {
  threadId: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.threadId = params.get('id');
    });
  }

  onBack() {
    if (this.threadId) {
      this.router.navigate(['threads', this.threadId]);
    } else {
      console.error('Thread ID is not available');
    }
  }

  async onCreatePost(form: NgForm) {
    const data = {
      title: form.value.title,
      content: form.value.content,
      authorId: (await this.usersService.getCurrentUser()).id,
      threadId: this.threadId || '',
    };

    try {
      await this.postsService.createPost(data);
      this.router.navigate(['threads', this.threadId]);
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
