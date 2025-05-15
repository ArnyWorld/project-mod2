import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'task/list',
    pathMatch: 'full',
  },
  {
    path: 'task/create',
    loadComponent: () =>
      import('./task/task-create/task-create.component').then(
        (m) => m.TaskCreateComponent
      ),
  },
  {
    path: 'task/list',
    loadComponent: () =>
      import('./task/task-list/task-list.component').then(
        (m) => m.TaskListComponent
      ),
  },
  {
    path: 'task/edit/:id',
    loadComponent: () =>
      import('./task/task-create/task-create.component').then(
        (m) => m.TaskCreateComponent
      ),
  },
];
