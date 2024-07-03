import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { LucideAngularModule } from 'lucide-angular';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'post-item',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './post-item.component.html',
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  userId: string | null = null;
  userEmail!: string;
  threadId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private postsService: PostsService
  ) {}

  async ngOnInit() {
    this.userId = (await this.usersService.getCurrentUser()).id;
    this.userEmail = (
      await this.usersService.getUserById(this.post.authorId)
    ).email;
    this.threadId = this.route.snapshot.paramMap.get('id') || '';
  }

  onDelete() {
    this.postsService.deletePostById(this.post.id);
  }

  onEdit() {
    this.router.navigate([
      'threads',
      this.threadId,
      'posts',
      this.post.id,
      'edit',
    ]);
  }
}
