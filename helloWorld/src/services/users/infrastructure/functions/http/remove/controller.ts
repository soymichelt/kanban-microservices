import { RemoveUserRequest } from '@services/users/application/useCases/remove/removeUserRequest';
import { RemoveUserUseCase } from '@services/users/application/useCases/remove/removeUserUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RemoveUserController extends BaseController<RemoveUserRequest, string> {
  constructor(@inject('RemoveUserUseCase') private useCase: RemoveUserUseCase) {
    super();
  }

  public async run(request: RemoveUserRequest): Promise<string> {
    await this.useCase.run(request);

    return 'User removed';
  }
}
