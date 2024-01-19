import { container } from '@di/shared';
import { AllTasksUseCase } from '@services/tasks/application/useCases/all/allTaskUseCase';
import { CreateTaskUseCase } from '@services/tasks/application/useCases/create/createTaskUseCase';
import { UpdateTaskUseCase } from '@services/tasks/application/useCases/update/updateTaskUseCase';
import { UpdateTaskStateUseCase } from '@services/tasks/application/useCases/updateState/updateTaskStateUseCase';
import { TaskRepository } from '@services/tasks/domain/repositories/taskRepository';
import { AllTasksController } from '@services/tasks/infrastructure/functions/http/all/controller';
import { CreateTaskController } from '@services/tasks/infrastructure/functions/http/create/controller';
import { UpdateTaskController } from '@services/tasks/infrastructure/functions/http/update/controller';
import { UpdateTaskStateController } from '@services/tasks/infrastructure/functions/http/updateState/controller';
import { MongoTaskRepository } from '@services/tasks/infrastructure/persistence/mongodb/mongoTaskRepository';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { MongoUserRepository } from '@services/users/infrastructure/persistence/mongodb/MongoUserRepository';

container
  .register<TaskRepository>('TaskRepository', MongoTaskRepository)
  .register<UserRepository>('UserRepository', MongoUserRepository)
  .register<CreateTaskUseCase>('CreateTaskUseCase', CreateTaskUseCase)
  .register<CreateTaskController>('CreateTaskController', CreateTaskController)
  .register<AllTasksUseCase>('AllTasksUseCase', AllTasksUseCase)
  .register<AllTasksController>('AllTasksController', AllTasksController)
  .register<UpdateTaskStateUseCase>('UpdateTaskStateUseCase', UpdateTaskStateUseCase)
  .register<UpdateTaskStateController>('UpdateTaskStateController', UpdateTaskStateController)
  .register<UpdateTaskUseCase>('UpdateTaskUseCase', UpdateTaskUseCase)
  .register<UpdateTaskController>('UpdateTaskController', UpdateTaskController);

export { container };
