import { UserAuthenticatedResponse } from '@services/users/application/responses/userAuthenticatedResponse';
import { SigninRequest } from '@services/users/application/useCases/signin/signinRequest';
import { SigninUseCase } from '@services/users/application/useCases/signin/signinUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SigninController extends BaseController<SigninRequest, UserAuthenticatedResponse> {
  constructor(@inject('SigninUseCase') private useCase: SigninUseCase) {
    super();
  }

  public async run(request: SigninRequest): Promise<UserAuthenticatedResponse> {
    const result = await this.useCase.run(request);

    return result;
  }
}
