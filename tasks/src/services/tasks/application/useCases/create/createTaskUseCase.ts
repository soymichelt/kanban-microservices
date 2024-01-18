import { TaskResponse } from '@services/tasks/application/responses/taskResponse';
import { CreateTaskRequest } from '@services/tasks/application/useCases/create/createTaskRequest';
import { TaskRepository } from '@services/tasks/domain/repositories/taskRepository';
import { Task, TaskPrimitives } from '@services/tasks/domain/task';
import { TaskDescription } from '@services/tasks/domain/valueObjects/taskDescription';
import { TaskId } from '@services/tasks/domain/valueObjects/taskId';
import { TaskPriority, TaskPriorityEnum } from '@services/tasks/domain/valueObjects/taskPriority';
import { TaskState } from '@services/tasks/domain/valueObjects/taskState';
import { UserNotFoundException } from '@services/users/domain/exceptions/userNotFoundException';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { UserId } from '@shared/domain/valueObjects/userId';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateTaskUseCase extends UseCase<CreateTaskRequest, TaskResponse> {
  constructor(
    @inject('TaskRepository') private repository: TaskRepository,
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: CreateTaskRequest): Promise<TaskPrimitives> {
    const userId = UserId.fromString(request.userId);
    const userExist = await this.userRepository.find(userId);
    if (!userExist) {
      throw new UserNotFoundException(request.userId);
    }

    const task = Task.create({
      taskId: TaskId.newId(),
      description: TaskDescription.build(request.description),
      state: TaskState.build(request.state),
      userId,
      priority: TaskPriority.build(request.priority as TaskPriorityEnum),
    });

    await this.repository.update(task);
    await this.eventBus.publish(task.pullEvents());

    return task.toPrimitives();
  }
}
