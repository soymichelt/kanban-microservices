import { TaskResponse } from '@services/tasks/application/responses/taskResponse';
import { TaskRepository } from '@services/tasks/domain/repositories/taskRepository';
import { TaskPrimitives } from '@services/tasks/domain/task';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AllTasksUseCase extends UseCase<void, TaskResponse[]> {
  constructor(@inject('TaskRepository') private repository: TaskRepository) {
    super();
  }

  public async run(): Promise<TaskPrimitives[]> {
    const result = await this.repository.all();

    return result.map((task) => task.toPrimitives());
  }
}
