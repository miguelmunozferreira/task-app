import { Component, inject } from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  private taskService: TaskService = inject(TaskService);
  taskName: string = '';
  taskList: Task[] = [];

  ngOnInit() {
    this.loadTask();
  }

  loadTask(): void {
    this.taskService.getAllTask().subscribe({
      next: (tasks) => (this.taskList = tasks),
      error: (error) => console.error('Error fetching tasks', error),
    });
  }

  addTask() {
    if (!this.taskName) return;

    const newTask: Task = { name: this.taskName, state: false };

    this.taskService.addTask(newTask).subscribe({
      next: (task) => {
        this.taskList.push(task);
        this.taskName = '';
      },
      error: (error) => console.log('Error add task', error),
    });
  }

  updateTask(id: string, task: Task) {
    this.taskService.updateTask(id, task).subscribe({
      next: (updatedTask) => {
        task.state = updatedTask.state;
      },
      error: (error) => console.error('Error modify task', error),
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () =>
        (this.taskList = this.taskList.filter((task) => task._id !== id)),
      error: (error) => console.error('Error remove task', error),
    });
  }
}
