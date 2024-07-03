import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-bar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './layout-bar.component.html',
})
export class LayoutBarComponent {
  userEmail: string | null = null;

  constructor(private router: Router, private usersService: UsersService) {}

  async ngOnInit() {
    this.userEmail = (await this.usersService.getCurrentUser()).email;
  }

  onClick() {
    this.usersService.logOut();
    this.router.navigate(['']);
  }
}
