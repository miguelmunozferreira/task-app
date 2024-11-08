import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    title: 'Tasks',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
