import { TaskResponse } from '@services/tasks/application/responses/taskResponse';
import { AllTasksUseCase } from '@services/tasks/application/useCases/all/allTaskUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AllTasksController extends BaseController<void, TaskResponse[]> {
  constructor(@inject('AllTasksUseCase') private useCase: AllTasksUseCase) {
    super();
  }

  public async run(): Promise<TaskResponse[]> {
    const result = await this.useCase.run();

    return result;
  }
}
