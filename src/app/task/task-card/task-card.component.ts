import { Component, input } from '@angular/core';
import { Task } from '../../interfaces/Task.interface';

@Component({
  selector: 'task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  task = input<Task>();
}
