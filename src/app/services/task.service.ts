import { inject, Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http: HttpClient = inject(HttpClient);

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(environment.apiUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/${id}`, {
      ...task,
      state: !task.state,
    });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${id}`);
  }
}
