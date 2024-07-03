import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  constructor() {
    super();
  }

  async getCurrentUser(): Promise<User> {
    const user = this.pocketbase.authStore.model;
    return user as User;
  }

  async getUserById(id: string): Promise<User> {
    return await this.pocketbase.collection('users').getOne(id);
  }

  isLoggedIn(): boolean {
    return this.pocketbase.authStore.isValid;
  }

  async logOut() {
    await this.pocketbase.authStore.clear();
  }

  async logIn(email: string, password: string) {
    return await this.pocketbase
      .collection('users')
      .authWithPassword(email, password);
  }
}
