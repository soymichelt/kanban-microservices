import { UserResponse } from '@services/users/application/responses/userResponse';
import { UpdateUserRequest } from '@services/users/application/useCases/update/updateUserRequest';
import { UpdateUserUseCase } from '@services/users/application/useCases/update/updateUserUseCase';
import { UserPrimitives } from '@services/users/domain/user';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateUserController extends BaseController<UpdateUserRequest, UserResponse> {
  constructor(@inject('UpdateUserUseCase') private useCase: UpdateUserUseCase) {
    super();
  }

  public async run(request: UpdateUserRequest): Promise<UserPrimitives> {
    const result = await this.useCase.run(request);

    return result;
  }
}
