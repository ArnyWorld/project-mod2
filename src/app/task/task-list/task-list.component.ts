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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    RouterLink,
    NzAlertModule,
    NzModalModule,
    NzTagModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  providers: [NzMessageService, NzModalService],
})
export class TaskListComponent implements OnInit {
  private _taskService = inject(TaskService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  confirmModal?: NzModalRef;
  tasks$!: Observable<Task[]>;
  taskList: Task[] = [];
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks = () => {
    this._taskService.tasks$.subscribe({
      next: (data) => {
        console.log(data);
        this.taskList = data;
      },
      error: (err) => console.log(err),
    });
  };
  editTask = (task: Task) => {
    this._taskService.updateTask(task);
  };
  deleteTask = (id: string) => {
    this._taskService.deleteTask(id);
    this.createBasicMessage(
      'success',
      'Se eliminó la actividad correctamente.'
    );
  };
  createBasicMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  showConfirm(id: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '¿Está seguro de eliminar esta actividad?',
      nzContent: 'Si elimina esta actividad no podrá recuperarlo.',
      nzOnOk: () => this.deleteTask(id),
    });
  }
}
