import { Task } from './../interfaces/Task.interface';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasksMod2';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  /* apiUrl = environment.apiTest;
    apiName = 'apiTask';
    prefix = '';
    */
  /* setPrefix(prefix: string) {
      this.prefix = prefix;
    } */
  constructor(private http: HttpClient) {
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

  /*Services Taskhttp*/
  /*
  getTask = ()=>{
    return this.http.get(this.apiUrl+ `/${this.apiName}`);
  }
    register(data: any) {
      return this.http.post(
        this.apiUrl + this.prefix + `/${this.apiName}`,
        data
      );
    }

    update(data: any, id: any): Observable<any> {
      return this.http.put(
        this.apiUrl + this.prefix + `/${this.apiName}/${id}`,
        data
      );
    }

    find(id: string = '') {
      return this.http.get(this.apiUrl + this.prefix + `/${this.apiName}/${id}`);
    }

    delete(id: string | number): Observable<any> {
      return this.http.delete(
        this.apiUrl + this.prefix + `/${this.apiName}/${id}`
      );
    }
  */
}
