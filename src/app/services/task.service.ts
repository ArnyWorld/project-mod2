import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../interfaces/Task.interface';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}
  private tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: uuidv4(),
      name: 'Desarrollar proyecto',
      description: 'El proyecto debe ser desarrollado en Angular',
      state: 'Pendiente',
    },
  ]);

  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  get listTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  addTask(task: Task) {
    this.tasksSubject.next([...this.listTasks, task]);
  }

  updateTask(updatedTask: Task) {
    const updatedList = this.listTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(updatedList);
  }

  deleteTask(id: string) {
    const filtered = this.listTasks.filter((task) => task.id !== id);
    this.tasksSubject.next(filtered);
  }
}
