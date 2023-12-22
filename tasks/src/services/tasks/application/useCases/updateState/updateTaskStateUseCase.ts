import { TaskResponse } from '@services/tasks/application/responses/taskResponse';
import { UpdateTaskStateRequest } from '@services/tasks/application/useCases/updateState/updateTaskStateRequest';
import { TaskNotFoundException } from '@services/tasks/domain/exceptions/taskNotFoundException';
import { TaskRepository } from '@services/tasks/domain/repositories/taskRepository';
import { TaskPrimitives } from '@services/tasks/domain/task';
import { TaskId } from '@services/tasks/domain/valueObjects/taskId';
import { TaskState } from '@services/tasks/domain/valueObjects/taskState';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateTaskStateUseCase extends UseCase<UpdateTaskStateRequest, TaskResponse> {
  constructor(
    @inject('TaskRepository') private repository: TaskRepository,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: UpdateTaskStateRequest): Promise<TaskPrimitives> {
    const taskId = TaskId.fromString(request.taskId);
    const taskState = TaskState.build(request.state);
    const task = await this.repository.find(taskId);
    if (!task) {
      throw new TaskNotFoundException(request.taskId);
    }

    task.updateState(taskState);

    await this.repository.update(task);
    await this.eventBus.publish(task.pullEvents());

    return task.toPrimitives();
  }
}
