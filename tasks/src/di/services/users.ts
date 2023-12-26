import { container } from '@di/shared';
import { UpdateUserUseCase } from '@services/users/application/useCases/update/updateUserUseCase';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { UpdateUserController } from '@services/users/infrastructure/functions/sns/update/controller';
import { MongoUserRepository } from '@services/users/infrastructure/persistence/mongodb/MongoUserRepository';

container
  .register<UserRepository>('UserRepository', MongoUserRepository)
  .register<UpdateUserUseCase>('UpdateUserUseCase', UpdateUserUseCase)
  .register<UpdateUserController>('UpdateUserController', UpdateUserController);

export { container };
