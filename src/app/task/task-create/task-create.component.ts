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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-task-create',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
  providers: [NzMessageService],
})
export class TaskCreateComponent implements OnInit {
  private router = inject(Router);
  private message = inject(NzMessageService);
  private _taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  action: string = '';
  tasks$!: Observable<Task[]>;
  taskForm!: FormGroup;
  editingTaskId: string | null = null;
  taskId!: string | null;
  taskRecovered!: any;
  taskList: Task[] = [];
  ngOnInit(): void {
    //this.tasks$ = this._taskService.tasks$;
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      state: ['Pendiente', Validators.required],
    });
    this.getTasks();
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    if (this.taskId) {
      this.action = 'Modificar';
      console.log('list: ', this.taskList);
      console.log('id: ', this.taskId);
      this.taskRecovered = this.taskList.find(
        (task) => task.id === this.taskId
      );
      console.log('this.taskRecovered: ', this.taskRecovered);
      this.setTaskForm(this.taskRecovered);
    } else {
      this.action = 'Crear';
    }
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
  addTask() {
    if (this.taskForm.invalid) {
      this.createBasicMessage('error', 'Todos los campos son obligatorios');
    } else {
      const formValue = this.taskForm.value;

      if (this.taskId) {
        this._taskService.updateTask({
          id: this.taskId,
          ...formValue,
        });
        this.taskId = null;
        this.createBasicMessage(
          'success',
          'Se modificó correctamente la actividad'
        );
      } else {
        // Crear
        this._taskService.addTask({
          id: uuidv4(),
          ...formValue,
        });
        this.createBasicMessage(
          'success',
          'Se registró correctamente la actividad'
        );
      }
      this.taskForm.reset({ state: 'Pendiente' });
      setTimeout(() => {
        this.router.navigate(['/task/list']);
      }, 1500);
    }
  }

  setTaskForm = (data: Task) => {
    this.taskForm.setValue({
      name: data?.name,
      description: data?.description,
      state: data?.state,
    });
  };

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

  createBasicMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
