import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThreadItemComponent } from '../thread-item/thread-item.component';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ThreadsService } from '../../services/threads.service';
import { Thread } from '../../models/thread';
import { LayoutBarComponent } from '../layout-bar/layout-bar.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'threads',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ThreadItemComponent,
    LayoutBarComponent,
    LucideAngularModule,
  ],
  templateUrl: './threads.component.html',
})
export class ThreadsComponent implements OnInit {
  constructor(private router: Router, private threadsService: ThreadsService) {}

  threads: Thread[] = [];
  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.loadThreads();
    this.setupSearch();
  }

  async loadThreads() {
    this.threads = await this.threadsService.getThreads();
  }

  setupSearch() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.searchThreads(query);
      });
  }

  onSearchInput(event: any) {
    this.searchSubject.next(event.target.value);
  }

  async searchThreads(query: string) {
    if (query) {
      this.threads = await this.threadsService.searchThreads(query);
    } else {
      this.loadThreads();
    }
  }

  onNewThread() {
    this.router.navigate(['threads', 'create']);
  }
}
