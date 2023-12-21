import { NotifyUserRemovedRequest } from '@services/users/application/useCases/notifRemoved/notifyUserRemovedRequest';
import { NotifyUserRemovedUseCase } from '@services/users/application/useCases/notifRemoved/notifyUserRemovedUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class NotifyUserRemovedController extends BaseController<NotifyUserRemovedRequest, string> {
  constructor(@inject('NotifyUserRemovedUseCase') private useCase: NotifyUserRemovedUseCase) {
    super();
  }

  public async run(request: NotifyUserRemovedRequest): Promise<string> {
    await this.useCase.run(request);

    return 'User removed has been notified';
  }
}
