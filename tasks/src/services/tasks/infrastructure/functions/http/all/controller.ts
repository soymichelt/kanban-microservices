import { UserTaskResponse } from '@services/tasks/application/responses/userTaskResponse';
import { AllTasksUseCase } from '@services/tasks/application/useCases/all/allTaskUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AllTasksController extends BaseController<void, UserTaskResponse[]> {
  constructor(@inject('AllTasksUseCase') private useCase: AllTasksUseCase) {
    super();
  }

  public async run(): Promise<UserTaskResponse[]> {
    const result = await this.useCase.run();

    return result;
  }
}
