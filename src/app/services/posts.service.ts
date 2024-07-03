import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends ApiService {
  private postCreated = new Subject<void>();
  postCreated$ = this.postCreated.asObservable();

  private postDeleted = new Subject<void>();
  postDeleted$ = this.postDeleted.asObservable();

  constructor() {
    super();
  }

  async getPostsByThreadId(threadId: string): Promise<Post[]> {
    const posts: Post[] = await this.pocketbase
      .collection('posts')
      .getFullList({
        filter: `threadId="${threadId}"`,
        sort: 'created',
      });
    return posts;
  }

  async createPost(data: {
    title: string;
    content: string;
    authorId: string;
    threadId: string;
  }): Promise<Post> {
    if (data.title === '' && data.content === '') {
      throw new Error('Title and content are required');
    } else if (data.title === '') {
      throw new Error('Title is required');
    } else if (data.content === '') {
      throw new Error('Content is required');
    }

    const post: Post = await this.pocketbase.collection('posts').create(data);
    this.postCreated.next();
    return post;
  }

  async getPostById(postId: string): Promise<Post> {
    const post: Post = await this.pocketbase.collection('posts').getOne(postId);
    return post;
  }

  async deletePostById(postId: string): Promise<void> {
    await this.pocketbase.collection('posts').delete(postId);
    this.postDeleted.next();
  }

  async searchPostsByThreadId(
    threadId: string,
    query: string
  ): Promise<Post[]> {
    const posts: Post[] = await this.pocketbase
      .collection('posts')
      .getFullList({
        filter: `threadId="${threadId}" && (title ~ "${query}" || content ~ "${query}")`,
        sort: 'created',
      });
    return posts;
  }

  async updatePostById(
    postId: string,
    data: { title: string; content: string }
  ): Promise<Post> {
    if (data.title === '' && data.content === '') {
      throw new Error('Title and content are required');
    } else if (data.title === '') {
      throw new Error('Title is required');
    } else if (data.content === '') {
      throw new Error('Content is required');
    }

    const post: Post = await this.pocketbase
      .collection('posts')
      .update(postId, data);
    return post;
  }
}
