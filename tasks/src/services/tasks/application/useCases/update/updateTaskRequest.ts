export type UpdateTaskRequest = {
  taskId: string;
  description: string;
  state: number;
  userId: string;
  priority?: string;
};
