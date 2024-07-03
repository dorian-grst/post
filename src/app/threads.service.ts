import { Injectable } from '@angular/core';
import { Thread } from './models/thread';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ThreadsService extends ApiService {
  constructor() {
    super();
  }

  async getThreadById(id: string): Promise<Thread> {
    return await this.pocketbase.collection('threads').getOne(id);
  }

  async getThreads(): Promise<Thread[]> {
    const threads: Thread[] = await this.pocketbase
      .collection('threads')
      .getFullList({
        sort: '-created',
      });

    // Récupérer le nombre de posts pour chaque thread
    for (let thread of threads) {
      const postCount = await this.getPostCountForThread(thread.id);
      thread.postCount = postCount;
    }

    return threads;
  }

  async getPostCountForThread(threadId: string): Promise<number> {
    const resultList = await this.pocketbase.collection('posts').getList(1, 1, {
      filter: `threadId="${threadId}"`,
    });
    return resultList.totalItems;
  }

  async createThread(data: { name: string }): Promise<Thread> {
    if (data.name === '') {
      throw new Error('Thread name cannot be empty');
    }

    const thread: Thread = await this.pocketbase
      .collection('threads')
      .create(data);
    return thread;
  }

  async searchThreads(query: string): Promise<Thread[]> {
    return await this.pocketbase.collection('threads').getFullList({
      sort: '-created',
      filter: `name ~ "${query}"`,
    });
  }
}
