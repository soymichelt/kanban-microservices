import { UserResponse } from '@services/users/application/responses/userResponse';
import { UpdateUserRequest } from '@services/users/application/useCases/update/updateUserRequest';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { User } from '@services/users/domain/user';
import { UserName } from '@services/users/domain/valueObjects/userName';
import { UseCase } from '@shared/domain/useCases/useCase';
import { UserId } from '@shared/domain/valueObjects/userId';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateUserUseCase extends UseCase<UpdateUserRequest, UserResponse> {
  constructor(@inject('UserRepository') private repository: UserRepository) {
    super();
  }

  public async run(request: UpdateUserRequest): Promise<UserResponse> {
    const user = User.build({
      userId: UserId.fromString(request.userId),
      username: UserName.build(request.username),
    });

    await this.repository.update(user);

    return user.toPrimitives();
  }
}
