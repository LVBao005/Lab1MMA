import { useState, useEffect, useCallback } from 'react';
import { subscribeToTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import type { Task, CreateTaskInput, UpdateTaskInput, TaskStatus } from '../types';

interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  statusFilter: TaskStatus | 'all';
  setStatusFilter: (filter: TaskStatus | 'all') => void;
  handleCreateTask: (input: CreateTaskInput) => Promise<void>;
  handleUpdateTask: (id: string, updates: UpdateTaskInput) => Promise<void>;
  handleDeleteTask: (id: string) => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  useEffect(() => {
    const unsubscribe = subscribeToTasks(
      (updatedTasks) => {
        setTasks(updatedTasks);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const filteredTasks =
    statusFilter === 'all' ? tasks : tasks.filter((t) => t.status === statusFilter);

  const handleCreateTask = useCallback(async (input: CreateTaskInput) => {
    await createTask(input);
  }, []);

  const handleUpdateTask = useCallback(async (id: string, updates: UpdateTaskInput) => {
    await updateTask(id, updates);
  }, []);

  const handleDeleteTask = useCallback(async (id: string) => {
    await deleteTask(id);
  }, []);

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
  };
}
