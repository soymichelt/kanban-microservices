import { User } from '@services/users/domain/user';
import { UserName } from '@services/users/domain/valueObjects/userName';
import { UserId } from '@shared/domain/valueObjects/userId';

export interface UserRepository {
  findByIds(userIds: UserId[]): Promise<User[]>;
  find(userId: UserId): Promise<User>;
  findByUsername(username: UserName): Promise<User>;
  update(user: User): Promise<void>;
  delete(userId: UserId): Promise<void>;
}
