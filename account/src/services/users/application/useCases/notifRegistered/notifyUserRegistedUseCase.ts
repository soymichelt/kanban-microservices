import { UserResponse } from '@services/users/application/responses/userResponse';
import { NotifyUserRegisteredRequest } from '@services/users/application/useCases/notifRegistered/notifyUserRegisteredRequest';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { MailingService } from '@shared/domain/services/mailingService';
import { UseCase } from '@shared/domain/useCases/useCase';
import { Id } from '@shared/domain/valueObjects/id';
import { inject, injectable } from 'tsyringe';

@injectable()
export class NotifyUserRegisteredUseCase extends UseCase<NotifyUserRegisteredRequest, UserResponse> {
  constructor(
    @inject('UserRepository') private repository: UserRepository,
    @inject('MailingService') private mailing: MailingService,
  ) {
    super();
  }

  public async run(request: NotifyUserRegisteredRequest): Promise<UserResponse> {
    const userId = Id.fromString(request.userId);
    const user = await this.repository.find(userId);
    const result = user.toPrimitives();

    await this.mailing.send({
      subject: 'Te damos la bienvenida',
      to: result.email,
      message: `Bienvenido a nuestra plataforma ${result.username}`,
    });

    delete result.password;
    return result;
  }
}
