import { TaskResponse } from '@services/tasks/application/responses/taskResponse';
import { CreateTaskRequest } from '@services/tasks/application/useCases/create/createTaskRequest';
import { CreateTaskUseCase } from '@services/tasks/application/useCases/create/createTaskUseCase';
import { TaskPrimitives } from '@services/tasks/domain/task';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateTaskController extends BaseController<CreateTaskRequest, TaskResponse> {
  constructor(@inject('CreateTaskUseCase') private useCase: CreateTaskUseCase) {
    super();
  }

  public async run(request: CreateTaskRequest): Promise<TaskPrimitives> {
    const result = await this.useCase.run(request);
    return result;
  }
}
