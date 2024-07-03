import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Thread } from '../models/thread';
import { TimeAgoPipe } from './time-ago.pipe'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'thread-item',
  standalone: true,
  imports: [CommonModule, RouterModule, TimeAgoPipe],
  templateUrl: './thread-item.component.html',
})
export class ThreadItemComponent {
  @Input()
  thread!: Thread;

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['threads', this.thread.id]);
  }
}
