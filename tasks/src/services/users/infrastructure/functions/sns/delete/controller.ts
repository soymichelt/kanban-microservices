import { DeleteUserRequest } from '@services/users/application/useCases/delete/deleteUserRequest';
import { DeleteUserUseCase } from '@services/users/application/useCases/delete/deleteUserUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteUserController extends BaseController<DeleteUserRequest, void> {
  constructor(@inject('DeleteUserUseCase') private useCase: DeleteUserUseCase) {
    super();
  }

  public async run(request: DeleteUserRequest): Promise<void> {
    await this.useCase.run(request);
  }
}
