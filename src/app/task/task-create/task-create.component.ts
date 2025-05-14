import { Component, inject, input, OnInit, output } from '@angular/core';
import { Task } from '../../interfaces/Task.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { state } from '@angular/animations';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
})
export class TaskCreateComponent implements OnInit {
  private _taskService = inject(TaskService);
  fb = inject(FormBuilder);

  /*  taskForm!:FormGroup;
  addTask = output<Task>();
  taskList = input<Task[]>();
  task: string = ''; */
  tasks$!: Observable<Task[]>;
  taskForm!: FormGroup;
  editingTaskId: string | null = null;

  ngOnInit(): void {
    this.tasks$ = this._taskService.tasks$;

    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      state: ['Pendiente', Validators.required],
    });
  }

  addTask() {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;

    if (this.editingTaskId) {
      // Actualizar
      this._taskService.updateTask({
        id: this.editingTaskId,
        ...formValue,
      });
      this.editingTaskId = null;
    } else {
      // Crear
      this._taskService.addTask({
        id: uuidv4(),
        ...formValue,
      });
    }

    this.taskForm.reset({ state: 'Pendiente' });
  }

  editTask(task: Task) {
    this.editingTaskId = task.id;
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
      state: task.state,
    });
  }

  deleteTask(id: string) {
    this._taskService.deleteTask(id);
    if (this.editingTaskId === id) {
      this.taskForm.reset({ state: 'Pendiente' });
      this.editingTaskId = null;
    }
  }
}
