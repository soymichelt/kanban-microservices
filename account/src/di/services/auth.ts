import { container } from '@di/shared';
import { VerifyIfAuthorizedUseCase } from '@services/auth/application/useCases/verify/verifyIfAuthorizedUseCase';
import { UserAuthRepository } from '@services/auth/domain/repositories/userAuthRepository';
import { VerifyIfAuthorizedController } from '@services/auth/infrastructure/functions/http/verify/controller';
import { MongoUserAuthRepository } from '@services/auth/infrastructure/persistence/mongodb/MongoUserAuthRepository';

container
  .register<UserAuthRepository>('UserAuthRepository', MongoUserAuthRepository)
  .register<VerifyIfAuthorizedUseCase>('VerifyIfAuthorizedUseCase', VerifyIfAuthorizedUseCase)
  .register<VerifyIfAuthorizedController>('VerifyIfAuthorizedController', VerifyIfAuthorizedController);

export { container };
