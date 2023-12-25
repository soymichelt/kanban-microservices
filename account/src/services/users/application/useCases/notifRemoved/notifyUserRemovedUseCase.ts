import { MailingService } from '@shared/domain/services/mailingService';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

import { NotifyUserRemovedRequest } from './notifyUserRemovedRequest';

@injectable()
export class NotifyUserRemovedUseCase extends UseCase<NotifyUserRemovedRequest, void> {
  constructor(@inject('MailingService') private mailing: MailingService) {
    super();
  }

  public async run(request: NotifyUserRemovedRequest): Promise<void> {
    await this.mailing.send({
      to: request.email,
      subject: 'Te vamos a extrañar',
      message: `<p style="text-align: center;">
        Se ha eliminado tu cuenta. Adiós ${request.username} te vamos a extrañar
      </p>`,
    });
  }
}
