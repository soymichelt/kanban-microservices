import { TaskPrimitives } from '@services/tasks/domain/task';

export type UserTaskResponse = TaskPrimitives & {
  assignedTo: string;
};
