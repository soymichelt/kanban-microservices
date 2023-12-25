import { container } from '@di/shared';
import { GetAllUsersUseCase } from '@services/users/application/useCases/all/getAllUsersUseCase';
import { CreateUserUseCase } from '@services/users/application/useCases/create/createUserUseCase';
import { NotifyUserRegisteredUseCase } from '@services/users/application/useCases/notifRegistered/notifyUserRegistedUseCase';
import { NotifyUserRemovedUseCase } from '@services/users/application/useCases/notifRemoved/notifyUserRemovedUseCase';
import { RemoveUserUseCase } from '@services/users/application/useCases/remove/removeUserUseCase';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { CreateUserController } from '@services/users/infrastructure/functions/http/create/controller';
import { GetAllUsersController } from '@services/users/infrastructure/functions/http/getAll/controller';
import { RemoveUserController } from '@services/users/infrastructure/functions/http/remove/controller';
import { NotifyUserRegisteredController } from '@services/users/infrastructure/functions/sns/notifRegistered/controller';
import { NotifyUserRemovedController } from '@services/users/infrastructure/functions/sns/notifRemoved/controller';
import { MongoUserRepository } from '@services/users/infrastructure/persistence/mongodb/MongoUserRepository';

container
  .register<UserRepository>('UserRepository', MongoUserRepository)
  .register<CreateUserController>('CreateUserController', CreateUserController)
  .register<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase)
  .register<GetAllUsersUseCase>('GetAllUsersUseCase', GetAllUsersUseCase)
  .register<GetAllUsersController>('GetAllUsersController', GetAllUsersController)
  .register<NotifyUserRegisteredUseCase>('NotifyUserRegisteredUseCase', NotifyUserRegisteredUseCase)
  .register<NotifyUserRegisteredController>('NotifyUserRegisteredController', NotifyUserRegisteredController)
  .register<RemoveUserUseCase>('RemoveUserUseCase', RemoveUserUseCase)
  .register<RemoveUserController>('RemoveUserController', RemoveUserController)
  .register<NotifyUserRemovedUseCase>('NotifyUserRemovedUseCase', NotifyUserRemovedUseCase)
  .register<NotifyUserRemovedController>('NotifyUserRemovedController', NotifyUserRemovedController);

export { container };
