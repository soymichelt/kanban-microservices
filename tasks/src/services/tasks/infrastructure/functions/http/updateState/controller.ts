import { TaskResponse } from '@services/tasks/application/responses/taskResponse';
import { UpdateTaskStateRequest } from '@services/tasks/application/useCases/updateState/updateTaskStateRequest';
import { UpdateTaskStateUseCase } from '@services/tasks/application/useCases/updateState/updateTaskStateUseCase';
import { TaskPrimitives } from '@services/tasks/domain/task';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateTaskStateController extends BaseController<UpdateTaskStateRequest, TaskResponse> {
  constructor(@inject('UpdateTaskStateUseCase') private useCase: UpdateTaskStateUseCase) {
    super();
  }

  public async run(request: UpdateTaskStateRequest): Promise<TaskPrimitives> {
    const result = await this.useCase.run(request);
    return result;
  }
}
