import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'task/create',
    loadComponent: () => import('./task/task-create/task-create.component').then(m => m.TaskCreateComponent)
  },
  {
    path:'task/list',
    loadComponent: () => import('./task/task-list/task-list.component').then(m => m.TaskListComponent)
  }
];
