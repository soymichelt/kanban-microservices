import { UserAuthenticatedResponse } from '@services/users/application/responses/userAuthenticatedResponse';
import { SigninRequest } from '@services/users/application/useCases/signin/signinRequest';
import { UserCredentialsAreInvalidException } from '@services/users/domain/exceptions/userCredentialsAreInvalidException';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { UserTokenService } from '@services/users/domain/services/userTokenService';
import { User, UserPrimitivesProps } from '@services/users/domain/user';
import { UserName } from '@services/users/domain/valueObjects/userName';
import { EventBus } from '@shared/domain/events/eventBus';
import { EncriptionService } from '@shared/domain/services/encriptionService';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SigninUseCase extends UseCase<SigninRequest, UserAuthenticatedResponse> {
  constructor(
    @inject('UserRepository') private repository: UserRepository,
    @inject('EncriptionService') private encriptionService: EncriptionService,
    @inject('UserTokenService') private tokenService: UserTokenService,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: SigninRequest): Promise<UserAuthenticatedResponse> {
    const user = await this.repository.findByUsername(UserName.build(request.username));
    if (!user) {
      throw new UserCredentialsAreInvalidException(request.username);
    }
    const decryptedPassword = await this.encriptionService.decrypt(user.password.value);
    if (decryptedPassword !== request.password) {
      throw new UserCredentialsAreInvalidException(request.username);
    }

    user.signin();

    const token = await this.tokenService.encode(this.getUserPayload(user));

    await this.eventBus.publish(user.pullEvents());
    return { token };
  }

  private getUserPayload(user: User): Omit<UserPrimitivesProps, 'password'> {
    const primitives = user.toPrimitives();
    delete primitives.password;
    return { ...primitives };
  }
}
