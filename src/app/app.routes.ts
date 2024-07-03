import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { ThreadsComponent } from './threads/threads.component';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AuthGuard } from './auth.gard';
import { UpdatePostComponent } from './update-post/update-post.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'threads', component: ThreadsComponent, canActivate: [AuthGuard] },
  {
    path: 'threads/create',
    component: CreateThreadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'threads/:id',
    component: ThreadDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'threads/:id/posts/create',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'threads/:id/posts/:postId/edit',
    component: UpdatePostComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
