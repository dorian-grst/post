import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Thread } from '../../models/thread';
import { ThreadsService } from '../../services/threads.service';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { PostItemComponent } from '../post-item/post-item.component';
import { CommonModule } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { LayoutBarComponent } from '../layout-bar/layout-bar.component';

@Component({
  selector: 'thread-detail',
  standalone: true,
  imports: [
    LucideAngularModule,
    PostItemComponent,
    CommonModule,
    FormsModule,
    LayoutBarComponent,
  ],
  templateUrl: './thread-detail.component.html',
})
export class ThreadDetailComponent implements OnInit, OnDestroy {
  id!: string;
  thread: Thread | undefined;
  posts: Post[] = [];
  searchQuery: string = '';
  isLoading = true;
  private searchSubject = new Subject<string>();
  private postCreatedSubscription!: Subscription;
  private postDeletedSubscription!: Subscription;
  private searchSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private threadsService: ThreadsService,
    private postsService: PostsService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    this.loadThreadAndPosts();
    this.setupSubscriptions();
    this.setupSearch();
  }

  async loadThreadAndPosts() {
    this.isLoading = true;
    try {
      this.thread = await this.threadsService.getThreadById(this.id);
      if (this.thread) {
        this.posts = await this.postsService.getPostsByThreadId(this.id);
      } else {
        console.error('Thread not found');
      }
    } catch (error) {
      console.error('Error loading thread and posts:', error);
    } finally {
      this.isLoading = false;
    }
  }

  setupSubscriptions() {
    this.postCreatedSubscription = this.postsService.postCreated$.subscribe(
      () => this.loadThreadAndPosts()
    );
    this.postDeletedSubscription = this.postsService.postDeleted$.subscribe(
      () => this.loadThreadAndPosts()
    );
  }

  setupSearch() {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.searchPosts(query);
      });
  }

  onSearchInput(event: any) {
    this.searchSubject.next(event.target.value);
  }

  async searchPosts(query: string) {
    if (!this.thread) {
      console.error('Thread is not loaded');
      return;
    }
    if (query) {
      this.posts = await this.postsService.searchPostsByThreadId(
        this.thread.id,
        query
      );
    } else {
      this.posts = await this.postsService.getPostsByThreadId(this.thread.id);
    }
  }

  onNewPost() {
    this.router.navigate(['threads', this.id, 'posts', 'create']);
  }

  onBack() {
    this.router.navigate(['threads']);
  }

  ngOnDestroy() {
    this.postCreatedSubscription?.unsubscribe();
    this.postDeletedSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }
}
