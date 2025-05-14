import { Component, inject, OnInit } from '@angular/core';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { Task } from '../../interfaces/Task.interface';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-task-list',
  imports: [
    TaskCreateComponent,
    CommonModule,
    NzTableModule,
    TaskCardComponent,
    NzButtonModule,
    RouterLink
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  private _taskService = inject(TaskService);
  tasks$!: Observable<Task[]>;
  taskList: Task[] = [];
  ngOnInit(): void {
    this._taskService.tasks$.subscribe({
      next: (data) => {
        this.taskList = data;
      },
      error: (err) => console.log(err),
    });
  }

  editTask = (task:Task)=>{
    this._taskService.updateTask(task);
  }
  deleteTask = (id:string)=>{
    this._taskService.deleteTask(id);
  }
}
