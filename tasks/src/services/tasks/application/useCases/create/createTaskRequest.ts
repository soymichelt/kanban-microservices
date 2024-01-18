export type CreateTaskRequest = {
  description: string;
  state: number;
  userId: string;
  priority?: string;
};
