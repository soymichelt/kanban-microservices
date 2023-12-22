import { container } from '@di/shared';
import { CreateTaskUseCase } from '@services/tasks/application/useCases/create/createTaskUseCase';
import { TaskRepository } from '@services/tasks/domain/repositories/taskRepository';
import { CreateTaskController } from '@services/tasks/infrastructure/functions/http/create/controller';
import { MongoTaskRepository } from '@services/tasks/infrastructure/persistence/mongodb/mongoTaskRepository';

container
  .register<TaskRepository>('TaskRepository', MongoTaskRepository)
  .register<CreateTaskUseCase>('CreateTaskUseCase', CreateTaskUseCase)
  .register<CreateTaskController>('CreateTaskController', CreateTaskController);

export { container };
