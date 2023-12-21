import { UserResponse } from '@services/users/application/responses/userResponse';
import { GetAllUsersUseCase } from '@services/users/application/useCases/all/getAllUsersUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { Context } from 'aws-lambda';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllUsersController extends BaseController<void, UserResponse[]> {
  constructor(@inject('GetAllUsersUseCase') private useCase: GetAllUsersUseCase) {
    super();
  }

  public async run(_request: void, _context: Context): Promise<UserResponse[]> {
    const result = await this.useCase.run();

    return result;
  }
}
