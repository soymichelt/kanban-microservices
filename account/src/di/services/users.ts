import { container } from '@di/shared';
import { GetAllUsersUseCase } from '@services/users/application/useCases/all/getAllUsersUseCase';
import { CreateUserUseCase } from '@services/users/application/useCases/create/createUserUseCase';
import { NotifyUserRegisteredUseCase } from '@services/users/application/useCases/notifRegistered/notifyUserRegistedUseCase';
import { NotifyUserRemovedUseCase } from '@services/users/application/useCases/notifRemoved/notifyUserRemovedUseCase';
import { RemoveUserUseCase } from '@services/users/application/useCases/remove/removeUserUseCase';
import { SigninUseCase } from '@services/users/application/useCases/signin/signinUseCase';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { UserTokenService } from '@services/users/domain/services/userTokenService';
import { CreateUserController } from '@services/users/infrastructure/functions/http/create/controller';
import { GetAllUsersController } from '@services/users/infrastructure/functions/http/getAll/controller';
import { RemoveUserController } from '@services/users/infrastructure/functions/http/remove/controller';
import { SigninController } from '@services/users/infrastructure/functions/http/signin/controller';
import { NotifyUserRegisteredController } from '@services/users/infrastructure/functions/sns/notifRegistered/controller';
import { NotifyUserRemovedController } from '@services/users/infrastructure/functions/sns/notifRemoved/controller';
import { MongoUserRepository } from '@services/users/infrastructure/persistence/mongodb/MongoUserRepository';
import { JwtUserTokenService } from '@services/users/infrastructure/services/jwt/jwtUserTokenService';

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
  .register<NotifyUserRemovedController>('NotifyUserRemovedController', NotifyUserRemovedController)
  .register<UserTokenService>('UserTokenService', {
    useValue: new JwtUserTokenService({
      privateKey: process.env.JWT_PRIVATE_KEY?.toString().trim(),
    }),
  })
  .register<SigninUseCase>('SigninUseCase', SigninUseCase)
  .register<SigninController>('SigninController', SigninController);

export { container };
