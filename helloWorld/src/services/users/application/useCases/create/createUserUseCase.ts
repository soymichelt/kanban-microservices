import { UserResponse } from '@services/users/application/responses/userResponse';
import { CreateUserRequest } from '@services/users/application/useCases/create/createUserRequest';
import { UserEmailAlreadyExistException } from '@services/users/domain/exceptions/userEmailAlreadyExistException';
import { UserNameAlreadyExistException } from '@services/users/domain/exceptions/userNameAlreadyExistException';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { User } from '@services/users/domain/user';
import { UserEmail } from '@services/users/domain/valueObjects/userEmail';
import { UserName } from '@services/users/domain/valueObjects/userName';
import { UserPassword } from '@services/users/domain/valueObjects/userPassword';
import { UserPhone } from '@services/users/domain/valueObjects/userPhone';
import { EventBus } from '@shared/domain/events/eventBus';
import { EncriptionService } from '@shared/domain/services/encriptionService';
import { UseCase } from '@shared/domain/useCases/useCase';
import { Id } from '@shared/domain/valueObjects/id';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserUseCase extends UseCase<CreateUserRequest, UserResponse> {
  constructor(
    @inject('EventBus') private eventBus: EventBus,
    @inject('UserRepository') private repository: UserRepository,
    @inject('EncriptionService') private encriptionService: EncriptionService,
  ) {
    super();
  }

  public async run(request: CreateUserRequest): Promise<UserResponse> {
    const email = UserEmail.build(request.email);
    await this.verifyIfEmailExist(email);

    const username = UserName.build(request.username);
    await this.verifyIfUsernameExist(username);

    const encryptedPassword = await this.encriptionService.encrypt(request.password);
    const user = User.create({
      userId: Id.newId(),
      username,
      email,
      password: UserPassword.build(encryptedPassword),
      phone: UserPhone.build(request.phone),
    });

    await this.repository.update(user);
    await this.eventBus.publish(user.pullEvents());

    const result = user.toPrimitives();
    delete result.password;
    return { ...result };
  }

  private async verifyIfEmailExist(email: UserEmail): Promise<void> {
    const userWithTheSameEmail = await this.repository.findByEmail(email);
    if (userWithTheSameEmail) {
      throw new UserEmailAlreadyExistException(email);
    }
  }

  private async verifyIfUsernameExist(username: UserName): Promise<void> {
    const userWithTheSameEmail = await this.repository.findByUsername(username);
    if (userWithTheSameEmail) {
      throw new UserNameAlreadyExistException(username);
    }
  }
}
