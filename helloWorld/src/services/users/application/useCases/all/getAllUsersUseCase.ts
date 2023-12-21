import { UserResponse } from '@services/users/application/responses/userResponse';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllUsersUseCase extends UseCase<void, UserResponse[]> {
  constructor(@inject('UserRepository') private repository: UserRepository) {
    super();
  }

  public async run(): Promise<UserResponse[]> {
    const users = await this.repository.all();

    const result = users.map((user) => {
      return {
        ...user.toPrimitives(),
        password: undefined,
      };
    });

    return result;
  }
}
