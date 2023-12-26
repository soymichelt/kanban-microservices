import { TaskPrimitives } from '@services/tasks/domain/task';

export type UserTaskResponse = TaskPrimitives & {
  username: string;
};
