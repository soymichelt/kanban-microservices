import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { UserId } from '@shared/domain/valueObjects/userId';
import { inject, injectable } from 'tsyringe';

import { DeleteUserRequest } from './deleteUserRequest';

@injectable()
export class DeleteUserUseCase extends UseCase<DeleteUserRequest, void> {
  constructor(@inject('UserRepository') private repository: UserRepository) {
    super();
  }

  public async run(request: DeleteUserRequest): Promise<void> {
    const userId = UserId.fromString(request.userId);

    await this.repository.delete(userId);
  }
}
