import { UserAuth } from '@services/auth/domain/auth';
import { UserId } from '@services/auth/domain/valueObjects/userId';
import { UserToken } from '@services/auth/domain/valueObjects/userToken';

export interface UserAuthRepository {
  findByToken(userId: UserId, userToken: UserToken): Promise<UserAuth>;
}
