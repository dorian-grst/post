import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [UsersService],
  templateUrl: './login.component.html',
})
export class LoginPageComponent {
  constructor(private router: Router, private usersService: UsersService) {}

  userEmail!: string;
  userPassword!: string;
  errorMessage: string | null = null;

  async onSubmit(form: NgForm) {
    try {
      await this.usersService.logIn(form.value.email, form.value.password);
      this.router.navigate(['threads']);
    } catch (error) {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
