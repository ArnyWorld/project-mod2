import { Task } from './../interfaces/Task.interface';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasksMod2';
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    const initialTasks = this.loadTasks();
    this.tasksSubject.next(initialTasks);
  }

  private loadTasks = (): Task[] => {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  };

  private saveTasks = (tasks: Task[]) => {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    this.tasksSubject.next(tasks); // Emitimos las nuevas tareas
  };

  getTasks = (): Task[] => {
    return this.tasksSubject.value;
  };

  getTaskById = (id: string): Task | undefined => {
    return this.tasksSubject.value.find((task) => task.id === id);
  };

  addTask = (task: Task) => {
    const current = this.tasksSubject.value;
    this.saveTasks([...current, task]);
  };

  updateTask = (updated: Task) => {
    const updatedList = this.tasksSubject.value.map((task) =>
      task.id === updated.id ? updated : task
    );
    this.saveTasks(updatedList);
  };

  deleteTask = (id: string) => {
    const updatedList = this.tasksSubject.value.filter(
      (task) => task.id !== id
    );
    this.saveTasks(updatedList);
  };
}
