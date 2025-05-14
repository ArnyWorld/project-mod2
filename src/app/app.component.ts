import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCardComponent } from './task/task-card/task-card.component';
import { TaskListComponent } from './task/task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'task-project';
}
