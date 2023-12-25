import { UserResponse } from '@services/users/application/responses/userResponse';
import { NotifyUserRegisteredUseCase } from '@services/users/application/useCases/notifRegistered/notifyUserRegistedUseCase';
import { NotifyUserRegisteredRequest } from '@services/users/application/useCases/notifRegistered/notifyUserRegisteredRequest';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class NotifyUserRegisteredController extends BaseController<NotifyUserRegisteredRequest, UserResponse> {
  constructor(@inject('NotifyUserRegisteredUseCase') private useCase: NotifyUserRegisteredUseCase) {
    super();
  }

  public async run(request: NotifyUserRegisteredRequest): Promise<UserResponse> {
    const result = await this.useCase.run(request);
    return result;
  }
}
