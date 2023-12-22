import { Task } from '@services/tasks/domain/task';
import { TaskId } from '@services/tasks/domain/valueObjects/taskId';

export interface TaskRepository {
  all(): Promise<Task[]>;
  find(taskId: TaskId): Promise<Task>;
  update(task: Task): Promise<void>;
  delete(taskId: TaskId): Promise<void>;
}
