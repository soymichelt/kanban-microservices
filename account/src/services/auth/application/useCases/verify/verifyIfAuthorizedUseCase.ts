import { AuthResponse } from '@services/auth/application/responses/authResponse';
import { VerifyIfAuthorizedRequest } from '@services/auth/application/useCases/verify/verifyIfAuthorizedRequest';
import { UserAuthRepository } from '@services/auth/domain/repositories/userAuthRepository';
import { UserRole } from '@services/auth/domain/valueObjects/userRole';
import { UserRoleVerificationType } from '@services/auth/domain/valueObjects/userRoleVerification';
import { UserToken } from '@services/auth/domain/valueObjects/userToken';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { Id } from '@shared/domain/valueObjects/id';
import { inject, injectable } from 'tsyringe';

@injectable()
export class VerifyIfAuthorizedUseCase extends UseCase<VerifyIfAuthorizedRequest, AuthResponse> {
  constructor(
    @inject('UserAuthRepository') private repository: UserAuthRepository,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: VerifyIfAuthorizedRequest): Promise<AuthResponse> {
    const userId = Id.fromString(request.userId);
    const token = UserToken.build(request.token);
    const role = UserRole.build(request.role);

    const userSelected = await this.repository.findByToken(userId, token);
    if (!userSelected) {
      return { verificationType: UserRoleVerificationType.unauthorized().value };
    }

    const verificationType = userSelected.verifyRole(role);

    await this.eventBus.publish(userSelected.pullEvents());

    return {
      verificationType: verificationType.value,
      auth: userSelected.toPrimitives(),
    };
  }
}
