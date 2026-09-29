export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  teamId: string | null;
  assigneeId: string | null;
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt'>>;
