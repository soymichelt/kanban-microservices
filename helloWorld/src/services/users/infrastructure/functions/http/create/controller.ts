import { UserResponse } from '@services/users/application/responses/userResponse';
import { CreateUserRequest } from '@services/users/application/useCases/create/createUserRequest';
import { CreateUserUseCase } from '@services/users/application/useCases/create/createUserUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserController extends BaseController<CreateUserRequest, UserResponse> {
  constructor(@inject('CreateUserUseCase') private useCase: CreateUserUseCase) {
    super();
  }

  public async run(request: CreateUserRequest): Promise<UserResponse> {
    const result = await this.useCase.run(request);

    return result;
  }

  protected override getSuccessStatusCode(): number {
    return 201;
  }
}
