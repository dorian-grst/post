import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { PostsService } from '../posts.service';
import { UsersService } from '../users.service';
import { CommonModule } from '@angular/common';
import { Post } from '../models/post';

@Component({
  selector: 'update-post',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, CommonModule],
  providers: [PostsService, UsersService],
  templateUrl: './update-post.component.html',
})
export class UpdatePostComponent implements OnInit {
  @Input() post!: Post;
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

  async ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('postId') || '';
    this.post = await this.postsService.getPostById(postId);
  }

  onBack() {
    if (this.threadId) {
      this.router.navigate(['threads', this.threadId]);
    } else {
      console.error('Thread ID is not available');
    }
  }

  async onUpdatePost(form: NgForm) {
    if (form.valid) {
      try {
        await this.postsService.updatePostById(this.post.id, {
          title: form.value.title,
          content: form.value.content,
        });
        this.router.navigate(['threads', this.threadId]);
      } catch (error) {
        console.log(error);
        this.errorMessage = 'An error occurred. Please try again.';
      }
    }
  }
}
