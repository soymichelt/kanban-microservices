import { TaskResponse } from '@services/tasks/application/responses/taskResponse';
import { UpdateTaskRequest } from '@services/tasks/application/useCases/update/updateTaskRequest';
import { TaskNotFoundException } from '@services/tasks/domain/exceptions/taskNotFoundException';
import { TaskRepository } from '@services/tasks/domain/repositories/taskRepository';
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
export class UpdateTaskUseCase extends UseCase<UpdateTaskRequest, TaskResponse> {
  constructor(
    @inject('TaskRepository') private repository: TaskRepository,
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: UpdateTaskRequest): Promise<TaskResponse> {
    const taskId = TaskId.fromString(request.taskId);
    const taskSelected = await this.repository.find(taskId);
    if (!taskSelected) {
      throw new TaskNotFoundException(request.taskId);
    }

    await this.validateUser(request.userId);

    taskSelected.update({
      description: request.description ? TaskDescription.build(request.description) : undefined,
      state: request.state ? TaskState.build(request.state) : undefined,
      priority: request.priority ? TaskPriority.build(request.priority as TaskPriorityEnum) : undefined,
      userId: request.userId ? UserId.fromString(request.userId) : undefined,
    });

    await this.repository.update(taskSelected);
    await this.eventBus.publish(taskSelected.pullEvents());

    return taskSelected.toPrimitives();
  }

  private async validateUser(userId: string): Promise<void> {
    if (!userId) return;

    const userIdVo = UserId.fromString(userId);
    const userExist = await this.userRepository.find(userIdVo);
    if (!userExist) {
      throw new UserNotFoundException(userId);
    }
  }
}
