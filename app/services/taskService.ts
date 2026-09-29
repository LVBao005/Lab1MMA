import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types';

const TASKS_COLLECTION = 'tasks';

/**
 * Subscribe to real-time task updates using onSnapshot
 */
export function subscribeToTasks(
  callback: (tasks: Task[]) => void,
  onError?: (error: Error) => void
): () => void {
  const q = query(
    collection(db, TASKS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const tasks: Task[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title ?? '',
          description: data.description ?? '',
          status: data.status ?? 'todo',
          priority: data.priority ?? 'medium',
          dueDate: data.dueDate ?? null,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toISOString()
              : data.createdAt ?? new Date().toISOString(),
          teamId: data.teamId ?? null,
          assigneeId: data.assigneeId ?? null,
        };
      });
      callback(tasks);
    },
    (error) => {
      console.error('Firestore onSnapshot error:', error);
      onError?.(error);
    }
  );

  return unsubscribe;
}

/**
 * Create a new task document in Firestore
 */
export async function createTask(input: CreateTaskInput): Promise<string> {
  const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
    ...input,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

/**
 * Update an existing task document
 */
export async function updateTask(id: string, updates: UpdateTaskInput): Promise<void> {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  await updateDoc(taskRef, { ...updates });
}

/**
 * Delete a task document
 */
export async function deleteTask(id: string): Promise<void> {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  await deleteDoc(taskRef);
}
