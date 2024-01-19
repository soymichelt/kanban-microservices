import { TaskResponse } from '@services/tasks/application/responses/taskResponse';
import { UpdateTaskRequest } from '@services/tasks/application/useCases/update/updateTaskRequest';
import { UpdateTaskUseCase } from '@services/tasks/application/useCases/update/updateTaskUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateTaskController extends BaseController<UpdateTaskRequest, TaskResponse> {
  constructor(@inject('UpdateTaskUseCase') private useCase: UpdateTaskUseCase) {
    super();
  }

  public async run(request: UpdateTaskRequest): Promise<TaskResponse> {
    const result = await this.useCase.run(request);
    return result;
  }
}
